import { left, right, type Either } from '@/core/either'
import { Entity } from '@/core/entities/entity'
import type { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { Optional } from '@/core/optional'
import { makeSlug } from '@/utils/make-slug'

type EventProps = {
  title: string
  slug: string
  details: string | null
  maximumAttendees: number | null
  amountOfAttendees: number
}

export class Event extends Entity<EventProps> {
  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get details() {
    return this.props.details
  }

  get maximumAttendees() {
    return this.props.maximumAttendees
  }

  get amountOfAttendees() {
    return this.props.amountOfAttendees
  }

  addAttendee(): Either<Error, void> {
    if (
      this.props.maximumAttendees &&
      this.props.amountOfAttendees >= this.props.maximumAttendees
    ) {
      return left(new Error('Maximum attendees reached'))
    }
    this.props.amountOfAttendees++

    return right(undefined)
  }

  static create(
    props: Optional<EventProps, 'slug' | 'amountOfAttendees'>,
    id?: UniqueEntityID,
  ) {
    return new Event(
      {
        ...props,
        slug: makeSlug(props.title),
        amountOfAttendees: props.amountOfAttendees ?? 0,
      },
      id,
    )
  }
}
