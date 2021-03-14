import url from 'url'
import querystring from 'querystring'
import { isObject } from '../object'
import http from 'http'
import https from 'https'

const Method = {
  get   : 'GET',
  post  : 'POST',
  put   : 'PUT',
  delete: 'DELETE',
  patch : 'PATCH',
}

class ResponseError extends Error {
  constructor(error, response) {
    super()

    this.response = response
    this.message = (error?.message || typeof error === 'string' && error) || null
    this.headers = response?.headers
    this.statusCode = response?.statusCode
    this.statusMessage = response?.statusMessage

    if (isObject(error)) {
      Object.assign(this, error)
    }
  }
}

function request(params) {
  const { path, method, body, headers } = params

  return new Promise((resolve, reject) => {
    const u = url.parse(path)

    const secure = u.protocol === 'https:'

    const httpClient = secure ? https : http

    const options = {
      method,
      host: u.hostname,
      path: u.path,
      port: u.port || (secure ? 443 : 80),
    }

    const onResponse = response => {
      const { statusCode, statusMessage, headers } = response

      const buffer = []
      const strings = []

      let bufferLength = 0
      let body = ''

      const onData = chunk => {
        if (!Buffer.isBuffer(chunk)) {
          strings.push(chunk)
        } else if (chunk.length) {
          bufferLength += chunk.length
          buffer.push(chunk)
        }
      }

      const onClose = () => {
        if (bufferLength) {
          body = Buffer.concat(buffer, bufferLength).toString('utf8')
        } else {
          body = strings.join()
        }

        resolve({ statusCode, statusMessage, headers, body })
      }

      response.on('error', reject)
      response.on('data', onData)
      response.on('close', onClose)
    }

    const request = httpClient.request(options, onResponse)

    if (headers) {
      Object.keys(headers).forEach(key => {
        request.setHeader(key, headers[key])
      })
    }

    if (body) {
      const stringifierBody = JSON.stringify(body)

      request.setHeader('content-length', Buffer.byteLength(stringifierBody))

      request.write(stringifierBody)

      request.on('finish', request.end)
    } else {
      request.end()
    }

    request.on('error', reject)
  })
}

const parseBody = response => {
  try {
    return Object.assign(response, { body: JSON.parse(response.body) })
  } catch {
    return response
  }
}

const getError = response => {
  if (response.statusCode === 502) {
    return 'Bad Gateway'
  }

  return response?.body?.error
    || response?.body
    || `Code: ${response.statusCode}, Message: (${response.statusMessage})`
}

const checkStatusCode = response => {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    return response
  }

  const error = getError(response)

  return Promise.reject(new ResponseError(error, response))
}

export class Request {
  constructor(url, method, body, headers = {}) {
    this.url = url
    this.method = method
    this.body = body
    this.headers = headers
  }

  static get(url) {
    return new this(url, Method.get)
  }

  static post(url, body) {
    return new this(url, Method.post, body)
  }

  static put(url, body) {
    return new this(url, Method.put, body)
  }

  static delete(url, body) {
    return new this(url, Method.delete, body)
  }

  static patch(url, body) {
    return new this(url, Method.patch, body)
  }

  setHeaders(headers) {
    this.headers = {
      ...this.headers,
      ...(headers || {}),
    }

    return this
  }

  query(obj) {
    this.url += `?${querystring.stringify(obj)}`

    return this
  }

  send(body) {
    this.body = body || this.body

    return request({
      path   : this.url,
      method : this.method,
      headers: this.headers,
      body   : this.body,
    })
      .then(parseBody)
      .then(checkStatusCode)
      .then(response => response.body)
  }

  then(successHandler, errorHandler) {
    return this.send().then(successHandler, errorHandler)
  }

  catch(errorHandler) {
    return this.send().catch(errorHandler)
  }
}
