import { Controller, type Req } from '@/core/http/controller'
import type { GetEventUseCase } from '@/domain/usecases/get-event'
import { z } from 'zod'
import { EventPresenter } from '../presenters/event-presenter'

export const getEventParamsSchema = z.object({
  slug: z.string().min(3),
})

export const getEventResponse = z.object({
  id: z.string().uuid(),
  title: z.string(),
  details: z.string().nullable(),
  maximumAttendees: z.number().int().positive().nullable(),
  slug: z.string(),
  amountOfAttendees: z.number().int(),
})

export class GetEventController extends Controller {
  constructor(private readonly getEventUseCase: GetEventUseCase) {
    super()
  }

  async handle(request: Req) {
    const { slug } = this.validate(getEventParamsSchema, request.params)

    const response = await this.getEventUseCase.execute({
      slug,
    })

    if (response.isLeft()) {
      return this.notFound(response.value)
    }

    return this.ok(EventPresenter.toHttp(response.value.event))
  }
}
