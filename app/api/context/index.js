import { notFoundAssert } from '../../errors'
import { StatusCode as c } from '../../constants/http'
import { ErrorHandler } from './decorators/endpoint/error-handler'
import { Logger } from './decorators/endpoint/logger'
import { EndpointsByServiceMap, getServiceMethod, isProperlyService } from './protected'

export default class Context {
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
      pathParams : null,
      queryParams: null,
      body       : null,
    }

    this.response = {
      statusCode: c.OK,
      headers   : {},
    }
  }

  static getCurrentService(url) {
    for (const Service of EndpointsByServiceMap.keys()) {
      if (isProperlyService(Service, url)) {
        return Service
      }
    }
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

  @Logger
  @ErrorHandler
  execute() {
    const serviceMethod = getServiceMethod(this)

    notFoundAssert(this[serviceMethod], 'Service Method Not Found')

    return this[serviceMethod]()
  }
}