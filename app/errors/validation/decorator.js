import { validate } from './index'

export function ValidationPipe(schema, options = {}) {
  const context = options?.context

  const validateEntity = validate(schema, options)

  return function(target, key, descriptor) {
    const method = descriptor.value

    descriptor.value = function(data = {}) {
      validateEntity(context ? data[context] : data)

      return method.call(this, data)
    }

    return descriptor
  }
}