import assert from 'assert'
import update from '../../../user/profile/update'

const updateProfile = (userId, changes) => {
  assert(userId, 'userId is required')

  return update(userId, changes)
}

export default updateProfile
