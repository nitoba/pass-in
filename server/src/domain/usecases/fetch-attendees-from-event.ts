import { type Either, right, left } from '@/core/either'
import type { AttendeeRepository } from '../repositories/attendee-repository'
import { Attendee } from '../entities/attendee'
import type { EventRepository } from '../repositories/event-repository'

type FFetchAttendeesFromEventRequest = {
  eventId: string
  query?: string
  page?: number
}

type FetchAttendeesFromEventResponse = Either<
  Error,
  {
    attendees: Attendee[]
    total: number
  }
>

export class FetchAttendeesFromEventUseCase {
  constructor(
    private readonly attendeeRepository: AttendeeRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async execute({
    eventId,
    query,
    page,
  }: FFetchAttendeesFromEventRequest): Promise<FetchAttendeesFromEventResponse> {
    const event = await this.eventRepository.findById(eventId)

    if (!event) {
      return left(new Error('Event not found'))
    }

    const result = await this.attendeeRepository.findManyByEventId({
      eventId,
      page,
      query,
    })

    return right({
      attendees: result.attendees,
      total: result.total,
    })
  }
}
