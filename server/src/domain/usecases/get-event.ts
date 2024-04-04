import { right, type Either } from '@/core/either'
import type { EventRepository } from '../repositories/event-repository'
import type { Event } from '../entities/event'

type GetEventUseCaseRequest = {
  slug: string
}

type GetEventUseCaseResponse = Either<Error, { event: Event }>

export class GetEventUseCase {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute({
    slug,
  }: GetEventUseCaseRequest): Promise<GetEventUseCaseResponse> {
    const event = await this.eventRepository.findBySlug(slug)
    if (!event) {
      throw new Error('Event not found')
    }

    return right({ event })
  }
}
