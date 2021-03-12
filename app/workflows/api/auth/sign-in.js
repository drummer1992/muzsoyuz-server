import assert from 'assert'
import { argumentsAssert, notFoundAssert } from '../../../errors'
import { sign } from '../../../utils/http/jwt'

const props = [
  '_id',
  'email',
  'hash',
  'salt',
  'googleId',
  'facebookId',
]

const signIn = async credentials => {
  assert(credentials, 'credentials are required')

  const user = await User.findOne({ email: credentials.email }, props)

  notFoundAssert(user, `Not found such user by email: ${credentials.email}`)
  argumentsAssert(user.hash, 'This email used by oAuth authorization system')
  argumentsAssert(await user.validatePassword(credentials.password), 'Password not valid')

  return sign({ _id: user._id })
}

export default signIn
