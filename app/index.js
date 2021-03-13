import { ENV } from './config'
import main from './main'
import * as db from './db'
import runScripts from '../scripts'

const onListen = () => console.log(`---Node.js Server started on port ${ENV.PORT}---`)

async function init() {
  await db.init()
  await runScripts()

  const httpClient = require(ENV.PROTOCOL)

  httpClient.createServer(main).listen(ENV.PORT, onListen)
}

init().catch(e => {
  console.error(e.stack)

  process.exit(-1)
})
