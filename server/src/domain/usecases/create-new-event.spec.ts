import { CreateNewEventUseCase } from './create-new-event'
import { left, right } from '@/core/either'
import { InMemoryEventRepository } from 'test/repositories/in-memory-user-repository'
import { makeEvent } from 'test/factories/make-event'

describe('CreateNewEventUseCase', () => {
  let eventRepository: InMemoryEventRepository
  let useCase: CreateNewEventUseCase

  beforeEach(() => {
    eventRepository = new InMemoryEventRepository()
    useCase = new CreateNewEventUseCase(eventRepository)
  })

  describe('execute', () => {
    it('should create a new event', async () => {
      const request = {
        title: 'Test Event',
        details: 'Some details',
        maximumAttendees: 100,
      }

      const result = await useCase.execute(request)

      expect(result).toEqual(right({ eventId: expect.any(String) }))
      expect(eventRepository.events).toHaveLength(1)
      expect(eventRepository.events[0]).toMatchObject({
        title: request.title,
        details: request.details,
        maximumAttendees: request.maximumAttendees,
      })
    })

    it('should return error if event title already exists', async () => {
      const existingEvent = makeEvent({
        title: 'Existing Event',
      })
      eventRepository.events.push(existingEvent)

      const result = await useCase.execute({
        details: existingEvent.details,
        maximumAttendees: existingEvent.maximumAttendees,
        title: existingEvent.title,
      })

      expect(result).toEqual(
        left(new Error('One event already takes this title')),
      )
    })
  })
})
