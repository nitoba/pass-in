import { z } from 'zod'
import { Controller, type Req } from '../../../../core/http/controller'
import type { CreateNewEventUseCase } from '@/domain/usecases/create-new-event'

export const createEventSchema = z.object({
  title: z.string().min(3).max(255),
  details: z.string().min(3).max(1000).nullable(),
  maximumAttendees: z.number().int().positive().min(1).max(1000).nullable(),
})

export const createEventSchemaResponse = z.object({
  eventId: z.string().uuid(),
})

export class CreateNewEventController extends Controller {
  constructor(private readonly useCase: CreateNewEventUseCase) {
    super()
  }

  async handle(request: Req) {
    const parsedBody = this.validate(createEventSchema, request.body)

    const { title, details, maximumAttendees } = parsedBody

    const result = await this.useCase.execute({
      title,
      details,
      maximumAttendees,
    })

    if (result.isLeft()) {
      return this.badRequest(result.value)
    }

    return this.created(result.value)
  }
}
