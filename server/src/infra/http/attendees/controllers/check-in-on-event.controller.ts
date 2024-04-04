import { Controller, type Req } from '@/core/http/controller'
import type { CheckInOnEventUseCase } from '@/domain/usecases/check-in-on-event'
import { z } from 'zod'

export const createCheckInSchema = z.object(
  {
    attendeeId: z.string().uuid(),
  },
  { required_error: 'Missing required fields' },
)

export const createCheckInSchemaResponse = z.object({
  checkInId: z.string().uuid(),
})

export class CheckInOnEventController extends Controller {
  constructor(private readonly useCase: CheckInOnEventUseCase) {
    super()
  }

  async handle(request: Req) {
    const { attendeeId } = this.validate(createCheckInSchema, request.params)

    const result = await this.useCase.execute({
      attendeeId,
    })

    if (result.isLeft()) {
      return this.badRequest(result.value)
    }

    return this.created(result.value)
  }
}
