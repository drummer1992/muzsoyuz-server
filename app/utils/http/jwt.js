import jwt from 'jsonwebtoken'
import { ENV } from '../../config'
import { UnauthorizedError } from '../../errors'

export const sign = payload => ({
  token: jwt.sign(payload, ENV.JWT_AUTH_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  }),
})

export const verify = token => {
  try {
    return jwt.verify(token, ENV.JWT_AUTH_SECRET)
  } catch (e) {
    throw new UnauthorizedError()
  }
}
