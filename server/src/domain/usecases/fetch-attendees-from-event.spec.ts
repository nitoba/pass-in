import { FetchAttendeesFromEventUseCase } from './fetch-attendees-from-event'
import { InMemoryAttendeeRepository } from 'test/repositories/in-memory-attendee-repository'

import { makeAttendee } from 'test/factories/make-attendee'
import { makeEvent } from 'test/factories/make-event'
import { right, left } from '@/core/either'
import { InMemoryEventRepository } from 'test/repositories/in-memory-user-repository'

describe('FetchAttendeesFromEventUseCase', () => {
  let attendeeRepository: InMemoryAttendeeRepository
  let eventRepository: InMemoryEventRepository
  let useCase: FetchAttendeesFromEventUseCase

  beforeEach(() => {
    attendeeRepository = new InMemoryAttendeeRepository()
    eventRepository = new InMemoryEventRepository()
    useCase = new FetchAttendeesFromEventUseCase(
      attendeeRepository,
      eventRepository,
    )
  })

  describe('execute', () => {
    it('should return attendees for a valid event', async () => {
      const event = makeEvent()
      await eventRepository.create(event)

      const attendee1 = makeAttendee({ attendeeOn: event.id })
      const attendee2 = makeAttendee({ attendeeOn: event.id })
      attendeeRepository.attendees.push(attendee1, attendee2)

      const result = await useCase.execute({ eventId: event.id.toString() })

      expect(result).toEqual(
        right({
          attendees: [attendee1, attendee2],
          total: 2,
        }),
      )
    })

    it('should return empty attendees list for event with no attendees', async () => {
      const event = makeEvent()
      await eventRepository.create(event)

      const result = await useCase.execute({ eventId: event.id.toString() })

      expect(result).toEqual(
        right({
          attendees: [],
          total: 0,
        }),
      )
    })

    it('should return error if event not found', async () => {
      const result = await useCase.execute({
        eventId: 'invalid',
      })

      expect(result).toEqual(left(new Error('Event not found')))
    })
  })
})
