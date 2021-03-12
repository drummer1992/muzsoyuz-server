import { verify } from '../../../../utils/http/jwt'

export function AuthGuard(instance, endpointName, descriptor) {
  const endpoint = descriptor.value

  descriptor.value = function(...args) {
    const token = this.getUserToken()

    const { _id } = verify(token)

    this.setCurrentUser(_id)

    return endpoint.call(this, ...args)
  }

  return descriptor
}
