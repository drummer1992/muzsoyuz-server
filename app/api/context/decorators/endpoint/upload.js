import assert from 'assert'
import fs from 'fs/promises'
import { uploadFile } from '../../../../utils/http/upload'
import { ENV as e } from '../../../../config'
import { uuidV4 } from '../../../../utils/uuid'

const makeDirIfNotExists = path => fs.mkdir(path).catch(console.error)

export function UploadPipe(options) {
  options = options || { directory: e.STATIC_FOLDER }

  assert(options?.directory, 'directory is required')

  return function(instance, serviceMethod, descriptor) {
    const endpoint = descriptor.value

    descriptor.value = async function(data = {}) {
      assert(!this.request.body, 'body has already parsed')

      const pathToDir = `${e.PATH_TO_STATIC + options.directory}/${this.getCurrentUserId()}`

      await makeDirIfNotExists(pathToDir)

      const { type } = this.request.queryParams

      const fileName = `${uuidV4()}.${type}`

      await uploadFile(this._req, pathToDir, fileName)

      const fileURL = `${e.STATIC_SERVER + options.directory}/${this.getCurrentUserId()}/${fileName}`

      console.log({ fileURL })

      return endpoint.call(this, {
        ...data,
        fileURL: fileURL,
      })
    }

    return descriptor
  }
}