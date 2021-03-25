import transform from '../transform'

export function TransformationPipe(schema, options = {}) {
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