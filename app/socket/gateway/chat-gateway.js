import { argumentsAssert } from '../../errors'
import { ErrorHandler } from '../decorators/error-handler'
import { ValidationPipe } from '../../utils/decorators/validation-pipe'
import messageEventHandler, { MessageValidationSchema } from '../bl/message'
import setActive from '../bl/set-active'
import createConversation from '../bl/create-conversation'
import getConversations from '../bl/get-conversations'
import getConversation from '../bl/get-conversation'
import getChatIds from '../bl/get-chat-ids'
import setViewed from '../bl/set-viewed'
import getUsers from '../bl/get-users'
import Gateway from './generic-gateway'
import e from '../event'

@ErrorHandler
class ChatGateway extends Gateway {
  getUsers() {
    return getUsers(this.user.objectId)
  }

  typingStart(roomId) {
    argumentsAssert(roomId, 'room identifier is required')

    this.client.broadcast.to(roomId)
      .except(this.user.objectId)
      .emit(e.TYPING_STARTED, roomId)
  }

  typingEnd(roomId) {
    argumentsAssert(roomId, 'room identifier is required')

    this.client.broadcast.to(roomId)
      .except(this.user.objectId)
      .emit(e.TYPING_ENDED, roomId)
  }

  async #setActive(isActive, chatIds) {
    const changes = { isActive, lastSeen: Date.now() }

    await setActive(this.user.objectId, changes)

    this.client.broadcast.to(chatIds)
      .except(this.user.objectId)
      .emit(e.USER_ACTIVE, {
        _id: this.user.objectId,
        ...changes,
      })
  }

  async setViewed(chatId) {
    await setViewed(this.user.objectId, chatId)

    this.client.broadcast.to(chatId)
      .emit(e.CHAT_VIEWED, chatId)
  }

  @ValidationPipe(MessageValidationSchema)
  async message(payload) {
    const message = await messageEventHandler(this.user.objectId, payload)

    this.socket.to(payload.chatId).emit(e.NEW_MESSAGE, message)
  }

  async createConversation(participantId) {
    const conversationId = await createConversation(this.user.objectId, participantId)

    this.socket.to([participantId, this.user.objectId])
      .emit(e.CREATED_CONVERSATION, conversationId)
  }

  getConversations() {
    return getConversations(this.user._id)
  }

  async joinTheCreatedConversation(chatId) {
    const conversation = await getConversation(this.user.objectId, chatId)

    this.client.join(chatId)

    return conversation
  }

  async connected() {
    const chatIds = await getChatIds(this.user.objectId)

    const rooms = [this.user.objectId, ...chatIds]

    await this.#setActive(true, chatIds)

    this.client.join(rooms)
  }

  async disconnect() {
    const chatIds = await getChatIds(this.user.objectId)

    const rooms = [this.user.objectId, ...chatIds]

    await this.#setActive(false, chatIds)

    rooms.forEach(room => {
      this.client.leave(room)
    })
  }
}

export default ChatGateway