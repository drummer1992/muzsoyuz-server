import Url from '../../utils/url'
import { addEndpoint } from '../../protected'

/**
 * @typedef {Object} Endpoint
 * @property {String} method
 * @property {String} serviceMethod
 * @property {RegExp} regExp
 */

function Endpoint(method, pattern) {
  const url = new Url(pattern)

  return function(instance, serviceMethod, descriptor) {
    const endpoint = descriptor.value

    addEndpoint(instance.constructor, {
      method,
      serviceMethod,
      regExp: url.getRegExp(),
    })

    descriptor.value = function(data) {
      this.request.pathParams = url.parsePathParams(this.request.url)
      this.request.queryParams = url.parseQueryParams(this.request.url)

      return endpoint.call(this, {
        ...data,
        pathParams : this.request.pathParams,
        queryParams: this.request.queryParams,
      })
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
