import { Attendee } from '@/domain/entities/attendee'
import type {
  AttendeeRepository,
  FindByEventIdAndEmailParams,
  FindManyByEventIdParams,
  FindManyByEventIdResponse,
} from '@/domain/repositories/attendee-repository'
import { db } from '../db'
import { DrizzleAttendeeMapper } from '../mappers/attendee-mapper'
import { attendees, checkIns } from '../schema'
import { and, count, eq, ilike } from 'drizzle-orm'

export class DrizzleAttendeeRepository implements AttendeeRepository {
  async create(attendee: Attendee): Promise<void> {
    await db.insert(attendees).values({
      id: attendee.id.toString(),
      name: attendee.name,
      email: attendee.email,
      eventId: attendee.attendeeOn?.toString(),
    })
  }

  async findManyByEventId({
    eventId,
    page = 1,
    query,
  }: FindManyByEventIdParams): Promise<FindManyByEventIdResponse> {
    const perPage = 10
    const offset = (page - 1) * perPage
    const baseQuery = db
      .select({
        id: attendees.id,
        name: attendees.name,
        email: attendees.email,
        eventId: attendees.eventId,
        checkInId: attendees.checkInId,
        checkIn: {
          createdAt: checkIns.createdAt,
        },
      })
      .from(attendees)
      .leftJoin(checkIns, eq(checkIns.attendeeId, attendees.id))
      .where(
        and(
          eq(attendees.eventId, eventId),
          query ? ilike(attendees.name, `%${query}%`) : undefined,
        ),
      )

    const [total] = await db
      .select({ count: count() })
      .from(baseQuery.as('baseQuery'))

    const attendeeOnDb = await baseQuery.offset(offset).limit(perPage)

    return {
      attendees: attendeeOnDb.map(DrizzleAttendeeMapper.toDomain),
      total: total.count,
    }
  }

  async findById(id: string): Promise<Attendee | null> {
    const attendee = await db.query.attendees.findFirst({
      where: (attendee, { eq }) => eq(attendee.id, id),
    })

    if (!attendee) {
      return null
    }

    return DrizzleAttendeeMapper.toDomain(attendee)
  }

  async findByEventIdAndEmail({
    email,
    eventId,
  }: FindByEventIdAndEmailParams): Promise<Attendee | null> {
    const attendee = await db.query.attendees.findFirst({
      where: (attendee, { eq, and }) =>
        and(eq(attendee.email, email), eq(attendee.eventId, eventId)),
    })

    if (!attendee) {
      return null
    }

    return DrizzleAttendeeMapper.toDomain(attendee)
  }
}
