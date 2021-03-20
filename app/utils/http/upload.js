import fs from 'fs'
import path from 'path'

export const uploadFile = (req, destination) => new Promise((resolve, reject) => {
  const writeStream = fs.createWriteStream(path.resolve(__dirname, destination))

  writeStream.on('error', reject)
  writeStream.on('close', resolve)
  req.on('error', reject)
  req.pipe(writeStream)
})
