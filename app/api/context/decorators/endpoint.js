import Url from '../utils/url'

function Endpoint(method, pattern) {
  const url = new Url(pattern)

  return function(instance, endpointName, descriptor) {
    const endpoint = descriptor.value

    instance.constructor.ENDPOINTS.push({
      method,
      endpointName,
      regExp: url.getRegExp()
    })

    descriptor.value = function(...args) {
      this.request.pathParams = url.parsePathParams(this.request.url)
      this.request.queryParams = url.parseQueryParams(this.request.url)

      return endpoint.apply(this, args)
    }

    return descriptor
  }
}

export function Get(path) {
  return Endpoint('GET', path)
}

export function Post(path) {
  return Endpoint('POST', path)
}

export function Patch(path) {
  return Endpoint('PATCH', path)
}

export function Put(path) {
  return Endpoint('PUT', path)
}

export function Delete(path) {
  return Endpoint('DELETE', path)
}
