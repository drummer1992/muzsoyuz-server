import { NotFoundError } from './errors'
import { StatusCode as c } from './constants/http'
import fs from 'fs'

const services = fs.readdirSync('./app/api')
  .filter(item => item.includes('.js'))
  .map(module => require(`./api/${module}`))

const serialize = response => JSON.stringify(response)

const main = async (req, res) => {
  const Service = services.find(Service => Service.isProperlyService(req.url))

  let response
  let statusCode

  if (Service) {
    const service = new Service(req, res)

    response = await service.execute()
    statusCode = service.response.statusCode
  } else {
    response = new NotFoundError('Service Not Found')
    statusCode = c.NOT_FOUND
  }

  res.writeHead(statusCode)
  res.end(serialize(response))
}

export default main
