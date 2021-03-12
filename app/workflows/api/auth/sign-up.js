import assert from 'assert'
import createUser from '../../user/profile/create'
import { argumentsAssert } from '../../../errors'
import { sign } from '../../../utils/http/jwt'

const signUp = async credentials => {
  assert(credentials, 'credentials are required')

  const where = {
    email: credentials.email,
    $or  : [
      { googleId: { $ne: null } },
      { facebookId: { $ne: null } },
    ],
  }

  argumentsAssert(!await User.exists(where), 'This email used by oAuth authorization system')

  const { _id } = await createUser(credentials)

  return sign({ _id })
}

export default signUp
