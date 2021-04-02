import { argumentsAssert } from '../../errors'
import { isEqualObjectIds } from '../../db/utils'

const getChatByUserMap = (chats, userId) => {
  const pickParticipantId = ({ participants }) => (
    participants.find(objectId => !isEqualObjectIds(userId, objectId))
  )

  return chats.reduce(
    (result, cur) => ({
      ...result, [pickParticipantId(cur)]: {
        _id     : cur._id,
        messages: cur.messages,
      },
    }),
    {},
  )
}

export default async userId => {
  const chats = await Chat.find({ participants: userId }, ['participants'])
    .populate(['messages'])

  argumentsAssert(chats.length, 'No one chat found for current user')

  const chatIdByUserId = getChatByUserMap(chats, userId)

  const users = await User.find({ _id: { $in: Object.keys(chatIdByUserId) } })

  return users.map(user => ({
    _id     : chatIdByUserId[user._id]._id,
    messages: chatIdByUserId[user._id].messages,
    user,
  }))
}