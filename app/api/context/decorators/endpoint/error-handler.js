import errorHandlerDecorator from '../error-handler'

export function ErrorHandler(instance, endpointName, descriptor) {
  descriptor.value = errorHandlerDecorator(descriptor.value)

  return descriptor
}