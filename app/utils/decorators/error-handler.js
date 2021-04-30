import { APIError, InternalServerError } from '../../errors'

const errorHandlerDecorator = fn => async function(...args) {
  try {
    return await fn.apply(this, args)
  } catch (error) {
    console.error(error.message)
    
    if (!(error instanceof APIError)) {
      error = new InternalServerError(`[UNHANDLED ERROR]: ${error.message}`)
    }

    if (error instanceof InternalServerError) {
      error.message = 'Internal Server Error'
    }

    return error
  }
}

export default errorHandlerDecorator