import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Attendee, type AttendeeProps } from '@/domain/entities/attendee'

export function makeAttendee(
  overrides: Partial<AttendeeProps> = {},
  id?: UniqueEntityID,
): Attendee {
  return Attendee.create(
    {
      name: 'Jonh Doe',
      email: 'john.doe@email.com',
      attendeeOn: new UniqueEntityID(),
      checkInAt: null,
      ...overrides,
    },
    id,
  )
}
