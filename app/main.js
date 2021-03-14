import Context from './api/context'
import { NotFoundError } from './errors'
import { StatusCode as c } from './constants/http'

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @returns {Promise<void>}
 */
const main = async (req, res) => {
  let response
  let statusCode
  let headers

  const Service = Context.getCurrentService(req.url)

  if (Service) {
    const service = new Service(req, res)

    response = await service.execute()
    
    statusCode = service.response.statusCode
    headers = service.response.headers
  } else {
    response = new NotFoundError('Service not found')
    statusCode = c.NOT_FOUND
  }

  res.writeHead(statusCode, headers)
  res.end(response && JSON.stringify(response))
}

export default main