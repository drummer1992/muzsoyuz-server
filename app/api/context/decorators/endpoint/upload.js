import assert from 'assert'
import { uploadFile } from '../../../../utils/http/upload'
import { ENV as e } from '../../../../config'

export function UploadPipe(options) {
  options = options || { directory: e.STATIC_FOLDER }

  assert(options?.directory, 'directory is required')

  return function(instance, serviceMethod, descriptor) {
    const endpoint = descriptor.value

    descriptor.value = async function(data = {}) {
      assert(!this.request.body, 'body has already parsed')
      assert(this.request.pathParams, 'pathParams hasn`t parsed')
      assert(this.request.pathParams.fileName, 'pathParams.fileName is required')

      const fileName = this.request.pathParams.fileName

      const filePath = `${e.PATH_TO_STATIC + options.directory}/${fileName}`

      await uploadFile(this._req, filePath)

      return endpoint.call(this, {
        ...data,
        fileURL: `${e.STATIC_SERVER + options.directory}/${fileName}`,
      })
    }

    return descriptor
  }
}