import { NotFoundError } from '../../errors'
import { StatusCode as c } from '../../constants/http'

const getCurrentEndpointName = (endpoints, method, url, servicePrefix) => {
  let endpointName = 'notFound'

  if (url.startsWith(servicePrefix)) {
    const path = url.replace(servicePrefix, '')

    const endpoint = endpoints.find(endpoint => (
      endpoint.method === method
      && endpoint.regExp.test(path)
    ))

    endpointName = endpoint ? endpoint.endpointName : endpointName
  }

  return endpointName
}

export default class Context {
  #req
  #res

  static serviceName = null
  static ENDPOINTS = []

  /**
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  constructor(req, res) {
    const { ENDPOINTS } = this.constructor

    /**
     *
     * @type {User}
     */
    this.user = null
    this.#req = req
    this.#res = res

    this.endpointName = getCurrentEndpointName(
      ENDPOINTS,
      req.method,
      req.url,
      this.constructor.serviceName,
    )

    this.request = {
      url        : req.url,
      method     : req.method,
      headers    : { ...req.headers },
      pathParams : {},
      queryParams: {},
    }

    this.response = { statusCode: c.OK }
  }

  getUserToken() {
    const authorizationToken = this.request.headers.authorization || ''

    return authorizationToken.split('Bearer ').pop()
  }

  setCurrentUser(_id) {
    this.user = new User({ _id })
  }

  getCurrentUser() {
    return this.user
  }

  getCurrentUserId() {
    return this.user?._id
  }

  setStatusCode(code) {
    this.response.statusCode = code
  }

  notFound() {
    this.setStatusCode(c.NOT_FOUND)

    return new NotFoundError('Service Method Not Found')
  }
}
