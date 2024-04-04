import { Controller, type Req } from '@/core/http/controller'
import type { GetAttendeeBadgeUseCase } from '@/domain/usecases/get-attendee-badge'
import { z } from 'zod'
import { AttendeePresenter } from '../presenters/attendee-presenter'

export const getAttendeeBadgeParams = z.object({
  attendeeId: z.string().uuid(),
})

export const getAttendeeBadgeResponse = z.object({
  badge: z.object({
    checkInUrl: z.string().url(),
    attendee: z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
    }),
    event: z.object({
      id: z.string().uuid(),
      title: z.string(),
    }),
  }),
})

export class GetAttendeeBadgeController extends Controller {
  constructor(private readonly useCase: GetAttendeeBadgeUseCase) {
    super()
  }

  async handle(request: Req) {
    const { attendeeId } = this.validate(getAttendeeBadgeParams, request.params)
    const result = await this.useCase.execute({
      attendeeId,
    })

    if (result.isLeft()) {
      return this.notFound(result.value)
    }

    const { data } = result.value

    const baseUrl = `${request.protocol}://${request.hostname}`

    const checkInUrl = new URL(
      `/attendees/${data.attendee.id.toString()}/check-in`,
      baseUrl,
    ).toString()

    return this.ok({
      badge: {
        checkInUrl,
        attendee: {
          ...AttendeePresenter.toHttp(data.attendee),
        },
        event: data.event,
      },
    })
  }
}
