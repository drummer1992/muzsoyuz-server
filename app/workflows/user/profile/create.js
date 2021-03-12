import assert from 'assert'
import { ErrorCode } from '../../../constants/db'
import { InvalidArgumentsError } from '../../../errors'

const createUser = async payload => {
  assert(payload, 'payload is required')

  const user = new User(payload)

  if (payload.password) {
    await user.setPassword(payload.password)
  }

  return user.save()
    .catch(e => {
      if (e.code === ErrorCode.ALREADY_EXISTS) {
        throw new InvalidArgumentsError(`User with email ${payload.email} already exists`)
      }

      throw e
    })
}

export default createUser
