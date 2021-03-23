import createChat from './create-chat'
import getChats from './get-chat'
import { callbackProvider } from './utils/events'

const Events = {
  createChat,
  getChats,
}

const onEvent = (eventHandler, context) => callbackProvider(
  async (message, callback) => {
    let maybeResponse = await eventHandler(message)

    if (typeof maybeResponse === 'function') {
      maybeResponse = await maybeResponse(context)
    }

    return callback(maybeResponse)
  })

/**
 * @typedef {Socket} ContextifiedSocket
 * @property {EventContext} context
 */

/**
 * @param {ContextifiedSocket} clientSocket
 */
export default clientSocket => {
  for (const [event, handler] of Object.entries(Events)) {
    clientSocket.on(event, onEvent(handler, clientSocket.context))
  }
}