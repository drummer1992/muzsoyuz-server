import errorHandlerDecorator from '../error-handler'

export function ErrorHandler(instance, serviceName, descriptor) {
  descriptor.value = errorHandlerDecorator(descriptor.value)

  return descriptor
}