import { validate } from './index'

export function ValidationPipe(schema, options = {}) {
  const validateBody = validate(schema, options)

  return function(target, key, descriptor) {
    const method = descriptor.value

    descriptor.value = function(body) {
      validateBody(body)

      return method.call(this, body)
    }

    return descriptor
  }
}
