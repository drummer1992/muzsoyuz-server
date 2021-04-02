import { objectId } from '../../utils/pickers'

/**
 *
 * @param {String} userId
 * @returns {Promise<String[]>}
 */
export default async userId => {
  const chats = await Chat.find({ participants: userId }, ['_id'])

  return chats.map(objectId)
}