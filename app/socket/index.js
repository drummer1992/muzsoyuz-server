import { Server } from 'socket.io'
import gateway from './gateway'
import { verify } from '../utils/http/jwt'
import { setSocketUser } from './context'
import { ENV } from '../config'

const authMiddleware = (socket, next) => {
  let error

  try {
    const { _id } = verify(socket.handshake.query.token)

    setSocketUser(_id)
  } catch (e) {
    error = e
  }

  next(error)
}

const initSocket = server => {
  const socket = new Server(server, {
    transports: ['polling', 'websocket'],
    cors      : { methods: ['GET', 'POST'] },
    path      : `${ENV.API_PREFIX}/chat`,
  })

  socket.use(authMiddleware)
  socket.on('connection', gateway(socket))
}

export default initSocket