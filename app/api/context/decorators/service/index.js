import { ENV } from '../../../../config'
import { setServiceRegExp } from '../../protected'

export function Service(name) {
  return function(Clazz) {
    setServiceRegExp(Clazz, new RegExp(`^${ENV.API_PREFIX}${name}`))
  }
}