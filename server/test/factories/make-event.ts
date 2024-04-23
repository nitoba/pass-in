import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Event, type EventProps } from '@/domain/entities/event'

export function makeEvent(
  override: Partial<EventProps> = {},
  id?: UniqueEntityID,
): Event {
  const event = Event.create(
    {
      details: 'Some details',
      title: 'Some title',
      maximumAttendees: 10,
      ...override,
    },
    id,
  )

  return event
}
