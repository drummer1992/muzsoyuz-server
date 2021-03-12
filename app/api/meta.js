import Context from './context'
import { Service } from './context/decorators/service'
import { Get } from './context/decorators/endpoint'
import { Logger } from './context/decorators/logger'

@Logger
@Service('/meta')
class MetaService extends Context {
  @Get('/roles')
  getRoles() {
    return Role.find()
  }
}

module.exports = MetaService