import { StatusCode as c } from '../../../constants/http'

export function Cors({ enable = true }) {
  return function(instance, serviceMethod, descriptor) {
    const endpoint = descriptor.value

    descriptor.value = function(...args) {
      if (enable) {
        this.setHeaders({
          'Access-Control-Allow-Origin'  : '*',
          'Access-Control-Request-Method': '*',
          'Access-Control-Allow-Headers' : '*',
          'Access-Control-Allow-Methods' : '*',
        })

        if (this.request.method === 'OPTIONS') {
          return this.setStatusCode(c.NO_CONTENT)
        }
      }

      return endpoint.apply(this, args)
    }

    return descriptor
  }
}