import loggerDecorator from '../logger'

export function Logger(instance, endpointName, descriptor) {
  descriptor.value = loggerDecorator(descriptor.value)

  return descriptor
}