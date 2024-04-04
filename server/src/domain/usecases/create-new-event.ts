import { left, type Either, right } from '@/core/either'
import type { EventRepository } from '../repositories/event-repository'
import { Event } from '../entities/event'

type CreateNewEventRequest = {
  title: string
  details: string | null
  maximumAttendees: number | null
}

type CreateNewEventResponse = Either<
  Error,
  {
    eventId: string
  }
>

export class CreateNewEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute({
    title,
    details,
    maximumAttendees,
  }: CreateNewEventRequest): Promise<CreateNewEventResponse> {
    const eventExists = await this.eventRepository.findBySlug(
      title.replace(/\s/g, '-').toLowerCase(),
    )

    if (eventExists) {
      return left(new Error('One event already takes this title'))
    }

    const event = Event.create({
      title,
      details,
      maximumAttendees,
    })

    await this.eventRepository.create(event)

    return right({
      eventId: event.id.toString(),
    })
  }
}
