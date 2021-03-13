import { NotFoundError } from './errors'
import { StatusCode as c } from './constants/http'
import fs from 'fs'
import { predicates as p } from './utils/object'

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
const main = async (req, res) => {
  let response = new NotFoundError('Service Not Found')
  let statusCode = c.NOT_FOUND

  const Service = services.find(Service => Service.isProperlyService(req.url))

  if (Service) {
    const service = new Service(req, res)

    response = await service.execute()
    statusCode = service.response.statusCode
  }

  const serializedResponse = serialize(response)

  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Content-Length', serializedResponse.length)
  res.writeHead(statusCode)
  res.end(serializedResponse)
}

export default main
