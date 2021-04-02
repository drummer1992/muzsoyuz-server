import errorHandlerDecorator from '../../../../utils/decorators/error-handler'

export function ErrorHandler(instance, serviceName, descriptor) {
  const method = descriptor.value

  descriptor.value = async function(...args) {
    const result = await errorHandlerDecorator(method.bind(this))(...args)

    if (result instanceof Error) {
      this.setStatusCode(result.statusCode)
    }

    return result
  }

  return descriptor
}