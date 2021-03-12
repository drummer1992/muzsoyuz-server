/* eslint-disable no-ex-assign */
import { APIError, InternalServerError } from '../../../errors'
import { decoratePrototype } from '../../../utils/object'

const errorHandler = method => async function(...args) {
  try {
    return await method.apply(this, args)
  } catch (error) {
    if (!(error instanceof APIError)) {
      error = new InternalServerError(`[UNHANDLED ERROR]: ${error.message}`)
    }

    if (error instanceof InternalServerError) {
      console.error(error.stack)

      error.message = 'Internal Server Error'
    }

    this.setStatusCode(error.statusCode)

    return error
  }
}

export function Service(name) {
  return function(Clazz) {
    Clazz.serviceName = name

    decoratePrototype(errorHandler, Clazz)
  }
}

