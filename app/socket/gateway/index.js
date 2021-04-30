import ChatGateway from './chat-gateway'
import e from '../event'
import callbackProvider from '../decorators/callback-provider'
import { getSocketUser } from '../context'

const onEvent = (eventHandler, { client, event }) => callbackProvider(
  async (message, callback) => {
    console.log(`User: ${getSocketUser()._id}, Event: ${event}, Data: ${JSON.stringify(message, null, 2)}`)

    const response = await eventHandler(message)

    if (response instanceof Error) {
      return client.emit(e.CHAT_ERROR, response)
    }

    return callback(response)
  },
)

export default socket => client => {
  const gateway = new ChatGateway(client, socket)

  const methods = Object.getOwnPropertyNames(ChatGateway.prototype)

  methods.forEach(method => {
    if (method !== 'constructor') {
      client.on(
        method,
        onEvent(
          gateway[method].bind(gateway),
          { client, event: method },
        ),
      )
    }
  })
}