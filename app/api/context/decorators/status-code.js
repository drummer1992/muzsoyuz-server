export function StatusCode(code) {
  return function(instance, serviceMethod, descriptor) {
    const endpoint = descriptor.value

    descriptor.value = async function(...args) {
      const response = await endpoint.apply(this, args)

      this.setStatusCode(code)

      return response
    }

    return descriptor
  }
}
