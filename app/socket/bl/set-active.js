import { notFoundAssert } from '../../errors'

export default async (userId, isActive) => {
  const { nModified: updatedCount } = await User.updateOne(
    { _id: userId },
    { isActive, lastSeen: Date.now() },
  )

  notFoundAssert(updatedCount, 'User not found')
}