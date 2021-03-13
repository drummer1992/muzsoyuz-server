const loggerDecorator = fn => async function(...args) {
  const start = Date.now()

  const result = await fn.apply(this, args)

  const ms = Date.now() - start

  let logger = console.log
  let errorMessage = ''

  if (result instanceof Error) {
    logger = console.error
    errorMessage = ` ${result.name}: ${result.message}`
  }

  logger(`[${this.response.statusCode}] '${this.request.method} ${this.request.url}'${errorMessage} ${ms} ms`)

  return result
}

export default loggerDecorator