import * as db from '../../app/db'
import { before, after } from 'mocha'
import http from 'http'
import assert from 'assert'
import main from '../../app/main'
import { ENV } from '../../app/config'
import bootstrap from '../../app/bootstrap'

const isLocalTest = () => /localhost/.test(ENV.TEST_URL)

const startServer = () => new Promise(resolve => {
  http.createServer(main).listen(ENV.PORT, resolve)
})

before(async () => {
  assert(ENV.TEST_URL, 'TEST_URL is not filled')

  await bootstrap()

  if (isLocalTest()) {
    await startServer()

    console.log('---Server started---')
  }
})

after(async () => {
  await db.close()

  process.exit(0)
})
