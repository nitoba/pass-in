import { CheckInOnEventUseCase } from './check-in-on-event'
import { InMemoryAttendeeRepository } from 'test/repositories/in-memory-attendee-repository'
import { makeAttendee } from 'test/factories/make-attendee'
import { makeEvent } from 'test/factories/make-event'
import { right, left } from '@/core/either'
import { InMemoryEventRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryCheckInRepository } from 'test/repositories/in-memory-check-in-repository'
import { makeCheckIn } from 'test/factories/make-check-in'

describe('CheckInOnEventUseCase', () => {
  let attendeeRepository: InMemoryAttendeeRepository
  let eventRepository: InMemoryEventRepository
  let checkInRepository: InMemoryCheckInRepository
  let useCase: CheckInOnEventUseCase

  beforeEach(() => {
    attendeeRepository = new InMemoryAttendeeRepository()
    eventRepository = new InMemoryEventRepository()
    checkInRepository = new InMemoryCheckInRepository()
    useCase = new CheckInOnEventUseCase(
      eventRepository,
      attendeeRepository,
      checkInRepository,
    )
  })

  it('should create a new check-in for valid attendee', async () => {
    const event = makeEvent()
    await eventRepository.create(event)

    const attendee = makeAttendee({ attendeeOn: event.id })
    await attendeeRepository.create(attendee)

    const result = await useCase.execute({
      attendeeId: attendee.id.toString(),
    })

    expect(result).toEqual(
      right({
        checkInId: expect.any(String),
      }),
    )

    expect(checkInRepository.checkIns).toHaveLength(1)
    expect(checkInRepository.checkIns[0].attendee.id).toBe(attendee.id)
  })

  it('should return error if attendee not found', async () => {
    const result = await useCase.execute({
      attendeeId: 'invalid',
    })

    expect(result).toEqual(left(new Error('Attendee not found')))
  })

  it('should return error if attendee already checked in', async () => {
    // existing check-in
    const event = makeEvent()
    await eventRepository.create(event)

    const attendee = makeAttendee({ attendeeOn: event.id })
    await attendeeRepository.create(attendee)

    const checkIn = makeCheckIn({
      attendee,
      event,
    })

    await checkInRepository.create(checkIn)

    // execute use case
    const result = await useCase.execute({
      attendeeId: attendee.id.toString(),
    })

    expect(result).toEqual(left(new Error('Attendee already checked in')))
  })
})
