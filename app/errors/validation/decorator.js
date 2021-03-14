import assert from 'assert'
import { validate } from './index'

const availableEntities = [
  'pathParams',
  'queryParams',
  'body',
]

export function ValidationPipe(schema, options = {}) {
  const context = options?.context || 'body'

  assert(availableEntities.includes(context), `Entity [${context}] is not supported`)

  const validateEntity = validate(schema, options)

  return function(target, key, descriptor) {
    const method = descriptor.value

    descriptor.value = function(...args) {
      validateEntity(this.request[context])

      return method.apply(this, args)
    }

    return descriptor
  }
}