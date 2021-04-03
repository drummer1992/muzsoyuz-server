import { notFoundAssert } from '../../errors'

export default async (userId, changes) => {
  const { nModified: updatedCount } = await User.updateOne({ _id: userId }, changes)

  notFoundAssert(updatedCount, 'User not found')
}