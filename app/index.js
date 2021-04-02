import http from 'http'
import { ENV } from './config'
import main from './main'
import bootstrap from './bootstrap'
import initSocket from './socket'
import { withCors } from './utils/http/cors'

const onStart = () => console.log(`---Node.js Server started on port ${ENV.PORT}---`)

async function init() {
  await bootstrap()

  const server = http.createServer(withCors(main))

  initSocket(server)

  server.listen(ENV.PORT, onStart)
}

init().catch(e => {
  console.error(e.stack)

  process.exit(-1)
})
