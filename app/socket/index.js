import io from 'socket.io'

const ioProvider = fn => server => {
  fn(io(server, {
    transports: ['polling', 'websocket'],
  }))
}

const socket = ioProvider(
  /**
   *
   * @param {Server} io
   */
  io => {
    io.on('connection', socket => {
      console.log(socket)
      console.log('PABEDA')
    })
  },
)

export default socket