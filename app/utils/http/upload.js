import path from 'path'
import formidable from 'formidable'
import { InvalidArgumentsError } from '../../errors'

export const uploadFile = (req, destination, fileName) => new Promise((resolve, reject) => {
  const form = formidable({ uploadDir: path.resolve(__dirname, destination) })

  form.on('fileBegin', (name, file) => {
    file.path = `${destination}/${fileName}`
  })

  form.parse(req, (err, fields, { file } = {}) => {
    if (err) {
      console.error(err.stack)

      return reject(new InvalidArgumentsError('Unable to parse form data'))
    }

    return resolve(file)
  })
})
