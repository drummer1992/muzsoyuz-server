import assert from "assert"

const updateProfile = async (userId, changes) => {
  assert(userId, 'userId is required')
  assert(changes, 'changes are required')

  const user = await User.findById(userId)

  Object.assign(user, changes)

  return user.save()
}

export default updateProfile
