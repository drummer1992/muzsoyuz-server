import { argumentsAssert } from '../../errors'

export default async (userId, chatId) => {
  argumentsAssert(chatId, 'chatId is required')

  await ChatMessage.updateMany({ chatId, viewed: false, senderId: { $ne: userId } }, {
    $set: { viewed: true },
  })
}