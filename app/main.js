import { NotFoundError } from './errors'
import { StatusCode as c } from './constants/http'
import fs from 'fs'
import { predicates as p } from './utils/object'
import { withCors } from './utils/http/with-cors'

const services = fs.readdirSync('./app/api')
  .filter(item => item.includes('.js'))
  .map(module => require(`./api/${module}`))

const serialize = response => p.isUndefined(response) ? '' : JSON.stringify(response)

/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @returns {Promise<void>}
 */
const main = withCors(async (req, res) => {
  let response
  let statusCode

  const Service = services.find(Service => Service.isProperlyService(req.url))

  if (Service) {
    const service = new Service(req, res)

    response = await service.execute()
    statusCode = service.response.statusCode
  } else {
    response = new NotFoundError('Service Not Found')
    statusCode = c.NOT_FOUND
  }

  const serializedResponse = serialize(response)

  res.writeHead(statusCode)
  res.end(serializedResponse)
})

export default main
