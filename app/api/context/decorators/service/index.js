import { ENV } from '../../../../config'

export function Service(name) {
  return function(Clazz) {
    Clazz.serviceRegExp = new RegExp(`^${ENV.API_PREFIX}${name}`)
  }
}