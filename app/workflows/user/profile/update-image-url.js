import assert from 'assert'
import { notFoundAssert } from '../../../errors'

const updateImageURL = async (userId, imageURL) => {
  assert(userId, 'userId is required')
  assert(userId, 'imageURL is required')

  const user = await User.findById(userId)

  notFoundAssert(user, 'User not found')

  user.imageURL = imageURL

  return user.save()
}

export default updateImageURL