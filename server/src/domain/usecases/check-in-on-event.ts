import { left, type Either, right } from '@/core/either'
import type { AttendeeRepository } from '../repositories/attendee-repository'
import type { CheckInRepository } from '../repositories/check-in-repository'
import type { EventRepository } from '../repositories/event-repository'
import { CheckIn } from '../entities/check-in'

type CheckInOnEventUseCaseRequest = {
  attendeeId: string
}

type CheckInOnEventUseCaseResponse = Either<
  Error,
  {
    checkInId: string
  }
>

export class CheckInOnEventUseCase {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly attendeeRepository: AttendeeRepository,
    private readonly checkInRepository: CheckInRepository,
  ) {}

  async execute({
    attendeeId,
  }: CheckInOnEventUseCaseRequest): Promise<CheckInOnEventUseCaseResponse> {
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

    const checkInExists =
      await this.checkInRepository.findByAttendeeIdAndEventId(
        attendeeId,
        attendee.attendeeOn.toString(),
      )

    if (checkInExists) {
      return left(new Error('Attendee already checked in'))
    }

    const checkIn = CheckIn.create({
      event,
      attendee,
    })

    await this.checkInRepository.create(checkIn)

    return right({
      checkInId: checkIn.id.toString(),
    })
  }
}
