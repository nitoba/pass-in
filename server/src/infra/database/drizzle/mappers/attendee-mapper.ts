import type { InferSelectModel } from 'drizzle-orm'
import type { attendees, checkIns } from '../schema'
import { Attendee } from '@/domain/entities/attendee'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type AttendeeSchema = InferSelectModel<typeof attendees> & {
  checkIn?: Pick<InferSelectModel<typeof checkIns>, 'createdAt'> | null
}

export class DrizzleAttendeeMapper {
  static toDomain(attendee: AttendeeSchema) {
    return Attendee.create(
      {
        name: attendee.name,
        email: attendee.email,
        attendeeOn: new UniqueEntityID(attendee.eventId),
        checkInAt: attendee.checkIn?.createdAt ?? null,
      },
      new UniqueEntityID(attendee.id),
    )
  }
}
