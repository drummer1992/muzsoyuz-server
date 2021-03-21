import fs from 'fs/promises'

export const makeDirIfNotExists = path => fs.mkdir(path, { recursive: true })