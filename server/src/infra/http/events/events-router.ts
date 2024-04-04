import type { FastifyInstance } from 'fastify'
import {
  CreateNewEventController,
  createEventSchema,
  createEventSchemaResponse,
} from './controllers/create-new-event.controller'
import { fastifyRouteAdapter } from '../adapters/fastify-route-adapter'
import { DrizzleEventRepository } from '@/infra/database/drizzle/repositories/drizzle-event-repository'
import { CreateNewEventUseCase } from '@/domain/usecases/create-new-event'
import { FetchEventsUseCase } from '@/domain/usecases/fetch-events'
import {
  FetchEventsController,
  fetchEventsResponse,
} from './controllers/fetch-events.controller'
import { FetchAttendeesFromEventUseCase } from '@/domain/usecases/fetch-attendees-from-event'
import { DrizzleAttendeeRepository } from '@/infra/database/drizzle/repositories/drizzle-attendee-repository'
import {
  FetchAttendeesFromEventController,
  fetchAttendeesParamsSchema,
  fetchAttendeesQuerySchema,
  fetchAttendeesResponse,
} from './controllers/fetch-attendees-from-event.controller'
import { CreateNewAttendeeUseCase } from '@/domain/usecases/create-new-attendee'
import {
  CreateNewAttendeeController,
  createAttendeeBodySchema,
  createAttendeeParamSchema,
  createAttendeeResponse,
} from './controllers/create-new-attendee.controller'
import {
  GetEventController,
  getEventParamsSchema,
  getEventResponse,
} from './controllers/get-event.controller'
import { GetEventUseCase } from '@/domain/usecases/get-event'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function eventsRouter(app: FastifyInstance) {
  const attendeeRepository = new DrizzleAttendeeRepository()
  const eventRepository = new DrizzleEventRepository()

  const createNewEventUseCase = new CreateNewEventUseCase(eventRepository)
  const fetchEventsUseCase = new FetchEventsUseCase(eventRepository)

  const createNewAttendeeUseCase = new CreateNewAttendeeUseCase(
    attendeeRepository,
    eventRepository,
  )

  const fetchAttendeesFromEventUseCase = new FetchAttendeesFromEventUseCase(
    attendeeRepository,
    eventRepository,
  )

  const getEventUseCase = new GetEventUseCase(eventRepository)

  const createNewEventController = new CreateNewEventController(
    createNewEventUseCase,
  )
  const fetchEventsController = new FetchEventsController(fetchEventsUseCase)

  const fetchAttendeesFromEventController =
    new FetchAttendeesFromEventController(fetchAttendeesFromEventUseCase)

  const createNewAttendeeController = new CreateNewAttendeeController(
    createNewAttendeeUseCase,
  )

  const getEventController = new GetEventController(getEventUseCase)

  app.withTypeProvider<ZodTypeProvider>().get(
    '/events',
    {
      schema: {
        summary: 'Fetch created events',
        tags: ['Events'],
        response: {
          200: fetchEventsResponse,
        },
      },
    },
    fastifyRouteAdapter(fetchEventsController),
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:slug',
    {
      schema: {
        summary: 'Get an event by slug',
        tags: ['Events'],
        params: getEventParamsSchema,
        response: {
          200: getEventResponse,
        },
      },
    },
    fastifyRouteAdapter(getEventController),
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Fetch attendees from an event',
        tags: ['Events'],
        params: fetchAttendeesParamsSchema,
        querystring: fetchAttendeesQuerySchema,
        response: {
          200: fetchAttendeesResponse,
        },
      },
    },
    fastifyRouteAdapter(fetchAttendeesFromEventController),
  )
  app.withTypeProvider<ZodTypeProvider>().post(
    '/events',
    {
      schema: {
        summary: 'Create a new event',
        tags: ['Events'],
        body: createEventSchema,
        response: {
          201: createEventSchemaResponse,
        },
      },
    },
    fastifyRouteAdapter(createNewEventController),
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/events/:eventId/attendees',
    {
      schema: {
        summary: 'Create a new attendee for an event',
        tags: ['Events'],
        params: createAttendeeParamSchema,
        body: createAttendeeBodySchema,
        response: {
          201: createAttendeeResponse,
        },
      },
    },
    fastifyRouteAdapter(createNewAttendeeController),
  )
}
