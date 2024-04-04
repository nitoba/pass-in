import { GetAttendeeBadgeUseCase } from '@/domain/usecases/get-attendee-badge'
import { DrizzleAttendeeRepository } from '@/infra/database/drizzle/repositories/drizzle-attendee-repository'
import type { FastifyInstance } from 'fastify'
import {
  GetAttendeeBadgeController,
  getAttendeeBadgeParams,
  getAttendeeBadgeResponse,
} from './controllers/get-attendee-badge.controller'
import { fastifyRouteAdapter } from '../adapters/fastify-route-adapter'
import { DrizzleEventRepository } from '@/infra/database/drizzle/repositories/drizzle-event-repository'
import { DrizzleCheckInRepository } from '@/infra/database/drizzle/repositories/drizzle-check-in-repository'
import { CheckInOnEventUseCase } from '@/domain/usecases/check-in-on-event'
import {
  CheckInOnEventController,
  createCheckInSchema,
  createCheckInSchemaResponse,
} from './controllers/check-in-on-event.controller'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function attendeeRouter(app: FastifyInstance) {
  const attendeeRepository = new DrizzleAttendeeRepository()
  const eventRepository = new DrizzleEventRepository()
  const checkInRepository = new DrizzleCheckInRepository()

  const getAttendeeBadgeUseCase = new GetAttendeeBadgeUseCase(
    attendeeRepository,
    eventRepository,
  )

  const checkInOnEventUseCase = new CheckInOnEventUseCase(
    eventRepository,
    attendeeRepository,
    checkInRepository,
  )

  const getAttendeeBadgeController = new GetAttendeeBadgeController(
    getAttendeeBadgeUseCase,
  )

  const checkInOnEventController = new CheckInOnEventController(
    checkInOnEventUseCase,
  )

  app.withTypeProvider<ZodTypeProvider>().route({
    method: 'GET',
    url: '/attendees/:attendeeId/badge',
    schema: {
      summary: 'Get attendee badge with check-in url',
      tags: ['Attendees'],
      params: getAttendeeBadgeParams,
      response: {
        200: getAttendeeBadgeResponse,
      },
    },
    handler: fastifyRouteAdapter(getAttendeeBadgeController),
  })

  app.withTypeProvider<ZodTypeProvider>().get(
    '/attendees/:attendeeId/check-in',
    {
      schema: {
        summary: 'Check-in on event',
        tags: ['Check Ins'],
        params: createCheckInSchema,
        response: {
          201: createCheckInSchemaResponse,
        },
      },
    },
    fastifyRouteAdapter(checkInOnEventController),
  )
}
