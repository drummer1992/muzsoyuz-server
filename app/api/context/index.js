import { notFoundAssert } from '../../errors'
import { StatusCode as c } from '../../constants/http'
import { ErrorHandler } from './decorators/endpoint/error-handler'
import { parseBody } from '../../utils/http/body-parser'
import { Logger } from './decorators/endpoint/logger'
import { Cors } from './decorators/cors'

export default class Context {
  constructor(req, res) {
    this.req = req
    this.res = res

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
      body       : {},
    }

    this.response = {
      statusCode: c.OK,
      headers   : {},
    }
  }

  /**
   * @type {RegExp}
   */
  static serviceRegExp

  /**
   * @type {Endpoint[]}
   */
  static ENDPOINTS = []

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

  setHeaders(headers) {
    this.response.headers = {
      ...this.response.headers,
      ...headers,
    }
  }

  static getCurrentService(url) {
    const { ENDPOINTS } = this

    const endpoint = ENDPOINTS.find(({ Service }) => Service.isProperlyService(url))

    return endpoint?.Service
  }

  getServiceMethod() {
    const { ENDPOINTS } = this.constructor

    const path = this.request.url.replace(this.constructor.serviceRegExp, '')

    const endpoint = ENDPOINTS.find(endpoint => {
      const sameMethod = endpoint.method === this.request.method
      const regexpIsMatched = endpoint.regExp.test(path)

      return sameMethod && regexpIsMatched
    })

    return endpoint?.serviceMethod
  }

  @Cors({ enable: true })
  @Logger
  @ErrorHandler
  async execute() {
    const serviceMethod = this.getServiceMethod()

    notFoundAssert(serviceMethod, 'Service Method Not Found')

    const body = await parseBody(this.req)

    return this[serviceMethod](body)
  }
}