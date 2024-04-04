import type { InferSelectModel } from 'drizzle-orm'
import type { attendees, checkIns, events } from '../schema'
import { CheckIn } from '@/domain/entities/check-in'
import { DrizzleEventMapper } from './event-mapper'
import { DrizzleAttendeeMapper } from './attendee-mapper'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

type CheckInSchema = InferSelectModel<typeof checkIns> & {
  event: InferSelectModel<typeof events>
  attendee: InferSelectModel<typeof attendees>
}

export class DrizzleCheckInMapper {
  static toDomain(checkIn: CheckInSchema) {
    return CheckIn.create(
      {
        event: DrizzleEventMapper.toDomain(checkIn.event),
        attendee: DrizzleAttendeeMapper.toDomain(checkIn.attendee),
      },
      new UniqueEntityID(checkIn.id),
    )
  }
}
