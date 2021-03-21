import assert from 'assert'
import { uploadFile } from '../../../../utils/http/upload'
import { ENV as e } from '../../../../config'
import { uuidV4 } from '../../../../utils/uuid'
import { makeDirIfNotExists } from '../../../../utils/file-system'

const resolveDirectory = (directory, userId) => {
  if (typeof directory === 'function') {
    return directory(userId)
  }

  return directory || ''
}

export function UploadPipe(options = {}) {
  assert(options?.directory, 'directory is required')

  return function(instance, serviceMethod, descriptor) {
    const endpoint = descriptor.value

    descriptor.value = async function(data = {}) {
      assert(!this.request.body, 'body has already parsed')

      const folder = e.STATIC_FOLDER + resolveDirectory(options.directory, this.getCurrentUserId())

      const pathToDir = e.PATH_TO_STATIC + folder

      await makeDirIfNotExists(pathToDir)

      const { type } = this.request.queryParams

      const fileName = `${uuidV4()}.${type}`

      await uploadFile(this._req, pathToDir, fileName)

      return endpoint.call(this, {
        ...data,
        fileURL: `${e.STATIC_SERVER + folder}/${fileName}`,
      })
    }

    return descriptor
  }
}