import { Entity } from '@/core/entities/entity'
import { Event } from './event'
import { Attendee } from './attendee'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'

type CheckInProps = {
  event: Event
  attendee: Attendee
}

export class CheckIn extends Entity<CheckInProps> {
  get event() {
    return this.props.event
  }

  get attendee() {
    return this.props.attendee
  }

  static create(props: CheckInProps, id?: UniqueEntityID): CheckIn {
    return new CheckIn(props, id)
  }
}
