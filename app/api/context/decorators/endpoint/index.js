import Url from '../../utils/url'
import { addEndpoint } from '../../protected'
import { parseBody } from '../../../../utils/http/body-parser'
import { isObject } from '../../../../utils/object'

const resolveOptions = pathOrOptions => isObject(pathOrOptions)
  ? pathOrOptions
  : { path: pathOrOptions, parseBody: true }

/**
 * @typedef {Object} Endpoint
 * @property {String} method
 * @property {String} serviceMethod
 * @property {RegExp} regExp
 */

function Endpoint(method, pathOrOptions) {
  const options = resolveOptions(pathOrOptions)

  const url = new Url(options.path)

  return function(instance, serviceMethod, descriptor) {
    const endpoint = descriptor.value

    addEndpoint(instance.constructor, {
      method,
      serviceMethod,
      regExp: url.getRegExp(),
    })

    descriptor.value = async function() {
      this.request.pathParams = url.parsePathParams(this.request.url)
      this.request.queryParams = url.parseQueryParams(this.request.url)

      if (options.parseBody) {
        this.request.body = await parseBody(this._req)
      }

      return endpoint.call(this, {
        body       : this.request.body,
        pathParams : this.request.pathParams,
        queryParams: this.request.queryParams,
      })
    }

    return descriptor
  }
}

export function Get(pathOrOptions) {
  return Endpoint('GET', pathOrOptions)
}

export function Post(pathOrOptions) {
  return Endpoint('POST', pathOrOptions)
}

export function Patch(pathOrOptions) {
  return Endpoint('PATCH', pathOrOptions)
}

export function Put(pathOrOptions) {
  return Endpoint('PUT', pathOrOptions)
}

export function Delete(pathOrOptions) {
  return Endpoint('DELETE', pathOrOptions)
}
