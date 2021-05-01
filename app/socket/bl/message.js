import { notFoundAssert } from '../../errors'
import { assertObjectIdIsValid as objectId, generateObjectId } from '../../utils/mongoose'
import { string } from 'schema-validator'

export const MessageValidationSchema = {
  text  : string,
  chatId: objectId,
}

export default async (userId, payload) => {
  const { text, chatId } = payload

  const chat = await Chat.findById(chatId)

  notFoundAssert(chat, 'Conversation is not found')

  const message = await ChatMessage.create({
    _id     : generateObjectId(),
    chatId  : chat._id,
    senderId: userId,
    text,
  })

  chat.messages.push(message)

  await chat.save()

  return message
}