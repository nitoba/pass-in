/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import type { Controller } from '@/core/http/controller'
import type { FastifyReply, FastifyRequest } from 'fastify'

export function fastifyRouteAdapter(controller: Controller) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const response = await controller.handle({
        hostname: request.hostname,
        path: request.url,
        protocol: request.protocol,
        body: request.body,
        params: request.params,
        query: request.query,
      })
      if (response.error) {
        return reply.status(response.status).send(response.error)
      }
      return reply.status(response.status).send(response.data)
    } catch (error: any) {
      console.log(error)
      if (controller.isBadRequest(error)) {
        return reply.status(400).send({
          error: {
            ...error.error,
            message: JSON.parse(error.error?.message!),
          },
        })
      }

      return reply.status(500).send({ message: error.message })
    }
  }
}
