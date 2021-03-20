import { verify } from '../../../../utils/http/jwt'

const PREFIX = 'Bearer '

const getUserToken = token => {
  const authorizationToken = token || ''

  return authorizationToken.split(PREFIX).pop()
}

export function AuthGuard(instance, serviceMethod, descriptor) {
  const endpoint = descriptor.value

  descriptor.value = function(...args) {
    const { _id } = verify(getUserToken(this.request.headers.authorization))

    this.setCurrentUser(_id)

    return endpoint.apply(this, args)
  }

  return descriptor
}
