import assert from 'assert'
import fs from 'fs/promises'
import { uploadFile } from '../../../../utils/http/upload'
import { ENV as e } from '../../../../config'

const makeDirIfNotExists = path => fs.mkdir(path).catch(console.error)

export function UploadPipe(options) {
  options = options || { directory: e.STATIC_FOLDER }

  assert(options?.directory, 'directory is required')

  return function(instance, serviceMethod, descriptor) {
    const endpoint = descriptor.value

    descriptor.value = async function(data = {}) {
      assert(!this.request.body, 'body has already parsed')
      assert(this.request.pathParams, 'pathParams hasn`t parsed')
      assert(this.request.pathParams.fileName, 'pathParams.fileName is required')

      const pathToDir = `${e.PATH_TO_STATIC + options.directory}/${this.getCurrentUserId()}`

      await makeDirIfNotExists(pathToDir)

      const fileName = this.request.pathParams.fileName

      await uploadFile(this._req, `${pathToDir}/${fileName}`)

      return endpoint.call(this, {
        ...data,
        fileURL: `${e.STATIC_SERVER + options.directory}/${this.getCurrentUserId()}/${fileName}`,
      })
    }

    return descriptor
  }
}