import { left, type Either, right } from '@/core/either'
import type { AttendeeRepository } from '../repositories/attendee-repository'
import { Attendee } from '../entities/attendee'
import type { EventRepository } from '../repositories/event-repository'

type CreateNewAttendeeRequest = {
  name: string
  email: string
  eventId: string
}

type CreateNewAttendeeResponse = Either<
  Error,
  {
    attendeeId: string
  }
>

export class CreateNewAttendeeUseCase {
  constructor(
    private readonly attendeeRepository: AttendeeRepository,
    private readonly eventRepository: EventRepository,
  ) {}

  async execute({
    email,
    name,
    eventId,
  }: CreateNewAttendeeRequest): Promise<CreateNewAttendeeResponse> {
    const event = await this.eventRepository.findById(eventId)

    if (!event) {
      return left(new Error('Event not found'))
    }

    const attendeeExists = await this.attendeeRepository.findByEventIdAndEmail({
      email,
      eventId,
    })

    if (attendeeExists) {
      return left(new Error('Attendee already exists on this event'))
    }

    const attendee = Attendee.create({
      email,
      name,
      attendeeOn: event.id,
    })

    const result = event.addAttendee()

    if (result.isLeft()) {
      return left(result.value)
    }

    await this.attendeeRepository.create(attendee)

    return right({
      attendeeId: attendee.id.toString(),
    })
  }
}
