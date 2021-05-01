import assert from 'assert'
import { uploadFile } from '../../../utils/http/upload'
import { ENV as e } from '../../../config'
import { uuidV4 } from '../../../utils/uuid'
import { makeDirIfNotExists } from '../../../utils/file-system'
import sharp from 'sharp'

const resolveDirectory = (directory, userId) => {
  if (typeof directory === 'function') {
    return directory(userId)
  }

  return directory || ''
}

const saveImage = async (req, { pathToDir, fileName, width, height, x, y }) => {
  await makeDirIfNotExists(pathToDir)
  const savedAt = await uploadFile(req, pathToDir, fileName)

  const buffer = await sharp(savedAt)
    .rotate()
    .extract({ width, height, left: x, top: y })
    .toBuffer()

  return sharp(buffer).toFile(`${pathToDir}/${fileName}`)
}

export function UploadImagePipe({ directory, name } = {}) {
  assert(directory, 'directory is required')

  return function(instance, serviceMethod, descriptor) {
    const endpoint = descriptor.value

    descriptor.value = async function(data = {}) {
      assert(!this.request.body, 'body has already parsed')

      const userId = this.getCurrentUserId()
      const folder = e.STATIC_FOLDER + resolveDirectory(directory, userId)
      const pathToDir = e.PATH_TO_STATIC + folder
      const fileName = `${name || uuidV4()}.${this.request.queryParams.type}`

      await saveImage(this._req, {
        fileName, pathToDir,
        ...this.request.queryParams,
      })

      return endpoint.call(this, {
        ...data,
        fileURL: `${e.STATIC_SERVER + folder}/${fileName}`,
      })
    }

    return descriptor
  }
}