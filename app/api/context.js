import { ErrorHandler } from './decorators/endpoint/error-handler'
import { Logger } from './decorators/endpoint/logger'
import { BaseService } from 'decorated-routing'
import { ApiPrefix } from 'decorated-routing/decorators'

@ApiPrefix('/api/v2')
export default class Context extends BaseService {
  setCurrentUser(_id) {
    this.user = new User({ _id })
  }

  getCurrentUser() {
    return this.user
  }

  getCurrentUserId() {
    return this.user?._id
  }

  @Logger
  @ErrorHandler
  execute() {
    return super.execute()
  }
}