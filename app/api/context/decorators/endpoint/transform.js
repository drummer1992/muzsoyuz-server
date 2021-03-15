const transform = (object, schema) => Object.keys(schema).reduce(
  (result, currentKey) => Object.assign(object, {
    ...result,
    [currentKey]: schema[currentKey](object[currentKey]),
  }),
  object,
)

export function Transform(schema, options = {}) {
  options.context = options.context || 'body'

  return function(instance, serviceMethod, descriptor) {
    const method = descriptor.value

    descriptor.value = function(...args) {
      this.request[options.context] = transform(this.request[options.context], schema)

      return method.apply(this, args)
    }

    return descriptor
  }
}