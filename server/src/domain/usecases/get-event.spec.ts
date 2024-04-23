import { GetEventUseCase } from './get-event'
import { right, left } from '@/core/either'
import { makeEvent } from 'test/factories/make-event'
import { InMemoryEventRepository } from 'test/repositories/in-memory-user-repository'

describe('GetEventUseCase', () => {
  let inMemoryEventRepository: InMemoryEventRepository
  let useCase: GetEventUseCase

  beforeEach(() => {
    inMemoryEventRepository = new InMemoryEventRepository()
    useCase = new GetEventUseCase(inMemoryEventRepository)
  })

  describe('execute', () => {
    it('should return event if found', async () => {
      const slug = 'test-event'
      const event = makeEvent({ title: 'Test Event' })

      await inMemoryEventRepository.create(event)

      const result = await useCase.execute({ slug })

      expect(result).toEqual(right({ event }))
    })

    it('should return error if event not found', async () => {
      const slug = 'invalid'

      const result = await useCase.execute({ slug })

      expect(result).toEqual(left(new Error('Event not found')))
    })
  })
})
