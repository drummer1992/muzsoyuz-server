import http from 'http'
import { ENV } from './config'
import main from './main'
import bootstrap from './bootstrap'

const onStart = () => console.log(`---Node.js Server started on port ${ENV.PORT}---`)

async function init() {
  await bootstrap()

  http.createServer(main).listen(ENV.PORT, onStart)
}

init().catch(e => {
  console.error(e.stack)

  process.exit(-1)
})
