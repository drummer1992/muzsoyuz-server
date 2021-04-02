import Validator, { and } from '../../errors/validation'
import { notFoundAssert } from '../../errors'
import { generateObjectId } from '../../db/utils'

const { required, string, objectId } = Validator

export const MessageValidationSchema = {
  text  : and([required, string]),
  chatId: and([required, objectId]),
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