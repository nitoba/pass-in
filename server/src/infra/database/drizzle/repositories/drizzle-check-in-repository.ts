import type { CheckIn } from '@/domain/entities/check-in'
import type { CheckInRepository } from '@/domain/repositories/check-in-repository'
import { db } from '../db'
import { attendees, checkIns } from '../schema'
import { DrizzleCheckInMapper } from '../mappers/check-in-mapper'
import { eq } from 'drizzle-orm'

export class DrizzleCheckInRepository implements CheckInRepository {
  async findByAttendeeIdAndEventId(
    attendeeId: string,
    eventId: string,
  ): Promise<CheckIn | null> {
    const checkIn = await db.query.checkIns.findFirst({
      where: (checkIn, { and, eq }) =>
        and(eq(checkIn.attendeeId, attendeeId), eq(checkIn.eventId, eventId)),
      with: {
        attendee: true,
        event: true,
      },
    })

    if (!checkIn) {
      return null
    }

    return DrizzleCheckInMapper.toDomain(checkIn)
  }

  async create(checkIn: CheckIn): Promise<void> {
    await db.transaction(async (tx) => {
      await tx.insert(checkIns).values({
        id: checkIn.id.toString(),
        attendeeId: checkIn.attendee.id.toString(),
        eventId: checkIn.event.id.toString(),
      })

      await tx
        .update(attendees)
        .set({
          checkInId: checkIn.id.toString(),
        })
        .where(eq(attendees.id, checkIn.attendee.id.toString()))
    })
  }
}
