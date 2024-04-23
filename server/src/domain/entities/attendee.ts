import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/optional'

export type AttendeeProps = {
  name: string
  email: string
  attendeeOn: UniqueEntityID
  checkInAt: Date | null
}

export class Attendee extends Entity<AttendeeProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get attendeeOn() {
    return this.props.attendeeOn
  }

  get checkInAt() {
    return this.props.checkInAt
  }

  static create(
    props: Optional<AttendeeProps, 'checkInAt'>,
    id?: UniqueEntityID,
  ) {
    return new Attendee(
      {
        ...props,
        checkInAt: props.checkInAt || null,
      },
      id,
    )
  }
}
