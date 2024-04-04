import { Controller } from '../../../../core/http/controller'
import type { FetchEventsUseCase } from '@/domain/usecases/fetch-events'
import { EventPresenter } from '../presenters/event-presenter'
import { z } from 'zod'

export const fetchEventsResponse = z.array(
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
    slug: z.string(),
    amountOfAttendees: z.number().int(),
  }),
)

export class FetchEventsController extends Controller {
  constructor(private readonly useCase: FetchEventsUseCase) {
    super()
  }

  async handle() {
    const result = await this.useCase.execute()

    if (result.isLeft()) {
      return this.badRequest(result.value)
    }

    return this.ok(result.value.events.map(EventPresenter.toHttp))
  }
}
