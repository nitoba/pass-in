import { right, type Either, left } from '@/core/either'
import type { AttendeeRepository } from '../repositories/attendee-repository'
import type { Attendee } from '../entities/attendee'
import type { EventRepository } from '../repositories/event-repository'

type GetAttendeeBadgeUseCaseRequest = {
  attendeeId: string
}

export type GetAttendeeBadgeUseCaseResponse = Either<
  Error,
  {
    data: {
      attendee: Attendee
      event: {
        id: string
        title: string
      }
    }
  }
>

export class GetAttendeeBadgeUseCase {
  constructor(
    private readonly attendeeRepository: AttendeeRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async execute({
    attendeeId,
  }: GetAttendeeBadgeUseCaseRequest): Promise<GetAttendeeBadgeUseCaseResponse> {
    const attendee = await this.attendeeRepository.findById(attendeeId)

    if (!attendee) {
      return left(new Error('Attendee not found'))
    }

    const event = await this.eventRepository.findById(
      attendee.attendeeOn.toString(),
    )

    if (!event) {
      return left(new Error('Event not found'))
    }

    return right({
      data: {
        attendee,
        event: {
          id: event.id.toString(),
          title: event.title,
        },
      },
    })
  }
}
