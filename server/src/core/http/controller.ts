import type { z } from 'zod'

export type Res = {
  status: number
  data?: unknown
  error?: {
    message: string
  }
}

export type Req = {
  protocol: string
  hostname: string
  path: string
  body?: unknown
  query?: unknown
  params?: unknown
}

export abstract class Controller {
  abstract handle(request: Req): Promise<Res>

  protected validate<Schema extends z.Schema>(
    schema: Schema,
    request: unknown,
  ): z.infer<typeof schema> {
    const result = schema.safeParse(request)

    if (result.success) {
      return result.data
    }

    throw this.badRequest(
      new Error(JSON.stringify(result.error.formErrors.formErrors.join(', '))),
    )
  }

  protected ok(data?: unknown): Res {
    return {
      status: 200,
      data,
    }
  }

  protected created(data?: unknown): Res {
    return {
      status: 201,
      data,
    }
  }

  protected badRequest(error: Error): Res {
    return {
      status: 400,
      error: {
        message: error.message,
      },
    }
  }

  protected notFound(error: Error): Res {
    return {
      status: 404,
      error: {
        message: error.message,
      },
    }
  }

  isBadRequest(
    error: ReturnType<typeof this.badRequest>,
  ): error is ReturnType<typeof this.badRequest> {
    return error.status === 400
  }
}
