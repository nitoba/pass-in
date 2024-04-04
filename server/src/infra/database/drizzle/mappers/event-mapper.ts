import type { InferSelectModel } from 'drizzle-orm'
import type { events } from '../schema'
import { Event } from '@/domain/entities/event'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export class DrizzleEventMapper {
  static toDomain(
    event: InferSelectModel<typeof events>,
    amountOfAttendees?: number,
  ) {
    return Event.create(
      {
        title: event.title,
        details: event.details,
        maximumAttendees: event.maximumAttendees,
        slug: event.slug,
        amountOfAttendees: amountOfAttendees ?? 0,
      },
      new UniqueEntityID(event.id),
    )
  }
}
