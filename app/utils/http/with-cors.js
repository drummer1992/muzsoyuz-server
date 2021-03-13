import { StatusCode as c } from '../../constants/http'

export const withCors = main => (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Request-Method', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')

  if (req.method === 'OPTIONS') {
    res.writeHead(c.NO_CONTENT)

    return res.end()
  }

  return main(req, res)
}