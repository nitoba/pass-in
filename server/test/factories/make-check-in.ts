import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CheckIn, type CheckInProps } from '@/domain/entities/check-in'
import { makeAttendee } from './make-attendee'
import { makeEvent } from './make-event'

export function makeCheckIn(
  overrides: Partial<CheckInProps> = {},
  id?: UniqueEntityID,
): CheckIn {
  const event = makeEvent()
  return CheckIn.create(
    {
      attendee: makeAttendee({
        attendeeOn: event.id,
      }),
      event,
      ...overrides,
    },
    id,
  )
}
