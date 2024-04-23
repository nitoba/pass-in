import { CreateNewAttendeeUseCase } from './create-new-attendee'
import { makeEvent } from 'test/factories/make-event'
import { left, right } from '@/core/either'
import { InMemoryEventRepository } from 'test/repositories/in-memory-user-repository'
import { InMemoryAttendeeRepository } from 'test/repositories/in-memory-attendee-repository'
import { makeAttendee } from 'test/factories/make-attendee'

describe('CreateNewAttendeeUseCase', () => {
  let attendeeRepository: InMemoryAttendeeRepository
  let eventRepository: InMemoryEventRepository
  let useCase: CreateNewAttendeeUseCase

  beforeEach(() => {
    attendeeRepository = new InMemoryAttendeeRepository()
    eventRepository = new InMemoryEventRepository()
    useCase = new CreateNewAttendeeUseCase(attendeeRepository, eventRepository)
  })

  describe('execute', () => {
    it('should create a new attendee', async () => {
      const event = makeEvent()
      await eventRepository.create(event)

      const request = {
        name: 'John Doe',
        email: 'john@doe.com',
        eventId: event.id.toString(),
      }

      const result = await useCase.execute(request)

      expect(result).toEqual(right({ attendeeId: expect.any(String) }))
      expect(attendeeRepository.attendees).toHaveLength(1)
      expect(attendeeRepository.attendees[0]).toMatchObject({
        name: request.name,
        email: request.email,
      })
    })

    it('should return error if event not found', async () => {
      const request = {
        name: 'John Doe',
        email: 'john@doe.com',
        eventId: 'invalid',
      }

      const result = await useCase.execute(request)

      expect(result).toEqual(left(new Error('Event not found')))
    })

    it('should return error if attendee already exists', async () => {
      const event = makeEvent()
      await eventRepository.create(event)

      const existingAttendee = makeAttendee({ attendeeOn: event.id })
      await attendeeRepository.create(existingAttendee)

      const request = {
        name: 'Jane Doe',
        email: existingAttendee.email,
        eventId: event.id.toString(),
      }

      const result = await useCase.execute(request)

      expect(result).toEqual(
        left(new Error('Attendee already exists on this event')),
      )
    })
  })
})
