const parse = str => {
  try {
    return str && JSON.parse(str)
  } catch {
    return str
  }
}

export const parseBody = req => new Promise((resolve, reject) => {
  const buffer = []

  req.on('error', reject)
  req.on('data', chunk => buffer.push(chunk))
  req.on('end', () => {
    resolve(parse(Buffer.concat(buffer).toString()))
  })
})
