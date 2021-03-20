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

    descriptor.value = function(data) {
      data[options.context] = transform(data[options.context], schema)

      return method.call(this, data)
    }

    return descriptor
  }
}