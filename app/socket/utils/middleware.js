import { verify } from '../../utils/http/jwt'
import EventContext from './context'

const socketMiddleware = (socket, next) => {
  let error

  try {
    const { _id } = verify(socket.handshake.query.token)

    socket.context = new EventContext(socket, _id)
  } catch (e) {
    error = e
  }

  next(error)
}

export default socketMiddleware