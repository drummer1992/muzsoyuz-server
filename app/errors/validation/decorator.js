import { validate } from './index'

export function ValidationPipe(schema, options = {}) {
  const validateBody = validate(schema, options)

  return function(target, key, descriptor) {
    const method = descriptor.value

    descriptor.value = function(...args) {
      validateBody(...args)

      return method.apply(this, args)
    }

    return descriptor
  }
}
