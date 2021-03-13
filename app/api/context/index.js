import { notFoundAssert } from '../../errors'
import { StatusCode as c } from '../../constants/http'
import { ErrorHandler } from './decorators/endpoint/error-handler'
import { parseBody } from '../../utils/http/body-parser'
import { Logger } from './decorators/endpoint/logger'

/**
 *
 * @param {String} url
 * @param {String} method
 * @param {Context} Service
 * @returns {String}
 */
const getEndpointName = (url, method, Service) => {
  const { serviceRegExp, ENDPOINTS } = Service

  const path = url.replace(serviceRegExp, '')

  const endpoint = ENDPOINTS.find(endpoint => {
    const sameMethod = endpoint.method === method
    const sameService = endpoint.Service === Service
    const regexpIsMatched = endpoint.regExp.test(path)

    return sameMethod && sameService && regexpIsMatched
  })

  return endpoint?.endpointName
}

export default class Context {
  /**
   * @type {RegExp}
   */
  static serviceRegExp = null
  /**
   * @type {EndpointParams[]}
   */
  static ENDPOINTS = []

  /**
   * @param {IncomingMessage} req
   * @param {ServerResponse} res
   */
  constructor(req, res) {
    this._req = req
    this._res = res
    /**
     * @type {User}
     */
    this.user = null
    this.request = {
      url        : req.url,
      method     : req.method,
      headers    : { ...req.headers },
      pathParams : {},
      queryParams: {},
    }

    this.response = { statusCode: c.OK }
  }

  static isProperlyService(url) {
    return new RegExp(this.serviceRegExp.source + '([^\\w]|$)').test(url)
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

  @Logger
  @ErrorHandler
  async execute() {
    const endpointName = getEndpointName(
      this.request.url,
      this.request.method,
      this.constructor,
    )

    notFoundAssert(endpointName, 'Service Method Not Found')

    return this[endpointName](await parseBody(this._req))
  }
}