import { Server } from 'socket.io'
import gateway from './gateway'
import socketMiddleware from './utils/middleware'

const socket = server => {
  const socket = new Server(server, {
    transports: ['polling', 'websocket'],
    cors      : { methods: ['GET', 'POST'] },
  })

  socket.use(socketMiddleware)

  socket.on('connection', gateway)
}

export default socket