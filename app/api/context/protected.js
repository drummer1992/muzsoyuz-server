export const EndpointsByServiceMap = new Map()
export const RegExpByServiceMap = new Map()

export const getServiceMethod = serviceInstance => {
  const Service = serviceInstance.constructor

  const serviceRegExp = RegExpByServiceMap.get(Service)

  const path = serviceInstance.request.url.replace(serviceRegExp, '')

  const ENDPOINTS = EndpointsByServiceMap.get(Service)

  const endpoint = ENDPOINTS.find(endpoint => {
    const sameMethod = endpoint.method === serviceInstance.request.method
    const regexpIsMatched = endpoint.regExp.test(path)

    return sameMethod && regexpIsMatched
  })

  return endpoint?.serviceMethod
}

export const setServiceRegExp = (Service, regExp) => {
  if (RegExpByServiceMap.has(Service)) {
    throw new Error('RegExp has already been set')
  }

  RegExpByServiceMap.set(Service, regExp)
}

export const addEndpoint = (Service, endpoint) => {
  if (!EndpointsByServiceMap.has(Service)) {
    EndpointsByServiceMap.set(Service, [])
  }

  const endpoints = EndpointsByServiceMap.get(Service)

  endpoints.push(endpoint)
}

export const isProperlyService = (Service, url) => {
  const regExp = RegExpByServiceMap.get(Service)

  if (!regExp) {
    throw new Error(`${this.name} service doesn't have pattern`)
  }

  return new RegExp(regExp.source + '([^\\w]|$)').test(url)
}