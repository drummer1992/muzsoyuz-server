import { verify } from '../../../../utils/http/jwt'

export function AuthGuard(instance, serviceMethod, descriptor) {
  const endpoint = descriptor.value

  descriptor.value = function(...args) {
    const token = this.getUserToken()

    const { _id } = verify(token)

    this.setCurrentUser(_id)

    return endpoint.apply(this, args)
  }

  return descriptor
}
