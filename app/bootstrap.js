import fs from 'fs/promises'
import path from 'path'
import * as db from './db'

const getJsFilesInDir = async pathToDir => {
  const dir = await fs.readdir(path.resolve(__dirname, pathToDir))

  return dir.filter(item => item.includes('.js'))
    .map(fileName => path.resolve(__dirname, pathToDir, fileName))
}

const loadModules = modules => Promise.all(modules.map(path => import(path)))

const initModels = async () => {
  const models = await getJsFilesInDir('./models')

  await loadModules(models)
}

const bootstrap = async () => {
  try {
    await initModels()
    await db.init()
  } catch (e) {
    await db.close()

    throw e
  }
}

export default bootstrap