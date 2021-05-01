import http from 'http'
import { ENV } from './config'
import bootstrap from './bootstrap'
import initSocket from './socket'
import { Routing } from 'decorated-routing'
import path from 'path'
import Service from './api/context'

const onStart = () => console.log(`---Node.js Server started on port ${ENV.PORT}---`)

async function init() {
  await bootstrap()

  const routing = new Routing({ Service, corsEnabled: true })

  const requestListener = await routing.init(path.resolve(__filename, '../api'))

  const server = http.createServer(requestListener)

  initSocket(server)

  server.listen(ENV.PORT, onStart)
}

init().catch(e => {
  console.error(e.stack)

  process.exit(-1)
})
