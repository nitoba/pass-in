import { GetAttendeeBadgeUseCase } from './get-attendee-badge'
import { makeAttendee } from 'test/factories/make-attendee'
import { makeEvent } from 'test/factories/make-event'
import { InMemoryAttendeeRepository } from 'test/repositories/in-memory-attendee-repository'
import { right, left } from '@/core/either'
import { InMemoryEventRepository } from 'test/repositories/in-memory-user-repository'

describe('GetAttendeeBadgeUseCase', () => {
  let attendeeRepository: InMemoryAttendeeRepository
  let eventRepository: InMemoryEventRepository
  let useCase: GetAttendeeBadgeUseCase

  beforeEach(() => {
    attendeeRepository = new InMemoryAttendeeRepository()
    eventRepository = new InMemoryEventRepository()
    useCase = new GetAttendeeBadgeUseCase(attendeeRepository, eventRepository)
  })

  it('should return attendee badge data', async () => {
    const event = makeEvent()
    await eventRepository.create(event)

    const attendee = makeAttendee({ attendeeOn: event.id })
    await attendeeRepository.create(attendee)

    const result = await useCase.execute({
      attendeeId: attendee.id.toString(),
    })

    expect(result).toEqual(
      right({
        data: {
          attendee,
          event: {
            id: event.id.toString(),
            title: event.title,
          },
        },
      }),
    )
  })

  it('should return error if attendee not found', async () => {
    const result = await useCase.execute({
      attendeeId: 'invalid',
    })

    expect(result).toEqual(left(new Error('Attendee not found')))
  })

  it('should return error if event not found', async () => {
    const attendee = makeAttendee()
    await attendeeRepository.create(attendee)

    const result = await useCase.execute({
      attendeeId: attendee.id.toString(),
    })

    expect(result).toEqual(left(new Error('Event not found')))
  })
})
