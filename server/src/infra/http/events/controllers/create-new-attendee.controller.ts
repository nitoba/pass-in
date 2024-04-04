import { z } from 'zod'
import { Controller, type Req } from '../../../../core/http/controller'
import type { CreateNewAttendeeUseCase } from '@/domain/usecases/create-new-attendee'

export const createAttendeeBodySchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
})

export const createAttendeeParamSchema = z.object({
  eventId: z.string().uuid(),
})

export const createAttendeeResponse = z.object({
  attendeeId: z.string().uuid(),
})

export class CreateNewAttendeeController extends Controller {
  constructor(private readonly useCase: CreateNewAttendeeUseCase) {
    super()
  }

  async handle(request: Req) {
    const { email, name } = this.validate(
      createAttendeeBodySchema,
      request.body,
    )
    const { eventId } = this.validate(createAttendeeParamSchema, request.params)

    const result = await this.useCase.execute({
      email,
      name,
      eventId,
    })

    if (result.isLeft()) {
      return this.badRequest(result.value)
    }

    return this.created(result.value)
  }
}
