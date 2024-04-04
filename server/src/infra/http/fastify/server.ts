import fastify, { type FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastifyCors from '@fastify/cors'
import type { Server } from '../../../core/http/server'
import { eventsRouter } from '../events/events-router'
import { attendeeRouter } from '../attendees/attendee-router'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

export class FastifyServer implements Server {
  private server: FastifyInstance

  constructor() {
    this.server = fastify()
    this.addCors()
    this.addSwagger()
    this.registerRoutes()
  }

  private registerRoutes() {
    this.server.register(eventsRouter)
    this.server.register(attendeeRouter)
  }

  private addSwagger() {
    this.server.register(fastifySwagger, {
      mode: 'dynamic',
      swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
          title: 'PassIn',
          description:
            'Specifications from API to manage an application for presencial events',
          version: '1.0.0',
        },
      },
      transform: jsonSchemaTransform,
    })

    this.server.register(fastifySwaggerUI, {
      routePrefix: '/docs',
    })
    this.server.setValidatorCompiler(validatorCompiler)
    this.server.setSerializerCompiler(serializerCompiler)
  }

  private addCors() {
    this.server.register(fastifyCors, {
      origin: '*',
    })
  }

  listen(port: number): void {
    this.server
      .listen({
        host: '0.0.0.0',
        port,
      })
      .then((address) => {
        console.log(`🚀 Server is running on: ${address}`)
      })
      .catch((error) => {
        console.error(`❌ Server is not running: ${error.message}`)
        process.exit(1)
      })
  }

  async close(): Promise<void> {
    await this.server.close()
  }
}
