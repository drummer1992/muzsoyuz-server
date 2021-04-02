import { notFoundAssert, argumentsAssert } from '../../errors'
import { isEqualObjectIds, isObjectId } from '../../db/utils'

export default async (userId, participantId) => {
  argumentsAssert(isObjectId(participantId), 'Participant identifier is not valid')
  argumentsAssert(!isEqualObjectIds(userId, participantId), 'Same ids')

  const participant = await User.findById(participantId)

  notFoundAssert(participant, 'Participant not found')

  argumentsAssert(!await Chat.exists({
    $and: [
      { participants: userId },
      { participants: participantId },
    ],
  }), 'Such chat already exists')

  const created = await Chat.create({ participants: [userId, participantId] })

  return {
    _id : created.objectId,
    user: participant,
  }
}