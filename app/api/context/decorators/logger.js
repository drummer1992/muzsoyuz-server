const loggerDecorator = fn => async function(...args) {
  const start = Date.now()

  const result = await fn.apply(this, args)

  const ms = Date.now() - start

  let logger = console.log
  let errorMessage = ''

  if (result instanceof Error) {
    logger = console.error

    const body = args.length ? `\n${JSON.stringify(...args, null, 2)}` : ''

    errorMessage = ` ${result.name}: ${result.message}${body}`
  }

  const time = new Date().toLocaleTimeString()

  logger(`[${time}] [${this.response.statusCode}] '${this.request.method} ${this.request.url}'${errorMessage} ${ms} ms`)

  return result
}

export default loggerDecorator