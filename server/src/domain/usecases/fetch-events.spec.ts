import { FetchEventsUseCase } from './fetch-events'
import { makeEvent } from 'test/factories/make-event'
import { right } from '@/core/either'
import { InMemoryEventRepository } from 'test/repositories/in-memory-user-repository'

describe('FetchEventsUseCase', () => {
  let eventRepository: InMemoryEventRepository
  let useCase: FetchEventsUseCase

  beforeEach(() => {
    eventRepository = new InMemoryEventRepository()
    useCase = new FetchEventsUseCase(eventRepository)
  })

  describe('execute', () => {
    it('returns events from repository', async () => {
      const events = [makeEvent(), makeEvent()]

      eventRepository.events.push(...events)

      const result = await useCase.execute()

      expect(result).toEqual(right({ events }))
    })

    it('returns empty events if none exist', async () => {
      const result = await useCase.execute()

      expect(result).toEqual(right({ events: [] }))
    })
  })
})
