import { createValidator } from 'schema-validator'
import { InvalidArgumentsError } from '../../errors'

export function ValidationPipe(schema, options = {}) {
  const context = options?.context

  const validate = createValidator(schema, context)

  return function(target, key, descriptor) {
    const method = descriptor.value

    descriptor.value = function(data = {}) {
      try {
        validate(context ? data[context] : data)
      } catch (e) {
        throw new InvalidArgumentsError(e.message)
      }

      return method.call(this, data)
    }

    return descriptor
  }
}