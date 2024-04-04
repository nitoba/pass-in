import { z } from 'zod'
import { Controller, type Req } from '../../../../core/http/controller'
import type { FetchAttendeesFromEventUseCase } from '@/domain/usecases/fetch-attendees-from-event'
import { AttendeeFromEventPresenter } from '../presenters/attendee-from-event-presenter'

export const fetchAttendeesParamsSchema = z.object({
  eventId: z.string().uuid(),
})

export const fetchAttendeesQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  query: z.string().optional(),
})

export const fetchAttendeesResponse = z.object({
  attendees: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      email: z.string().email(),
      attendeeOn: z.string().uuid(),
      checkInAt: z.date().nullable(),
    }),
  ),
  total: z.number().int().positive(),
})

export class FetchAttendeesFromEventController extends Controller {
  constructor(private readonly useCase: FetchAttendeesFromEventUseCase) {
    super()
  }

  async handle(req: Req) {
    const { eventId } = this.validate(fetchAttendeesParamsSchema, req.params)
    const { page, query } = this.validate(fetchAttendeesQuerySchema, req.query)

    const result = await this.useCase.execute({
      eventId,
      page,
      query,
    })

    if (result.isLeft()) {
      return this.badRequest(result.value)
    }

    const response = {
      attendees: result.value.attendees.map(AttendeeFromEventPresenter.toHttp),
      total: result.value.total,
    }

    return this.ok(response)
  }
}
