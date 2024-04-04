import { type Either, right } from '@/core/either'
import type { EventRepository } from '../repositories/event-repository'
import { Event } from '../entities/event'

type FetchEventsResponse = Either<
  Error,
  {
    events: Event[]
  }
>

export class FetchEventsUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(): Promise<FetchEventsResponse> {
    const events = await this.eventRepository.findMany()

    return right({
      events,
    })
  }
}
