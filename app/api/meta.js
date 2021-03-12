import Context from './context'
import { Service } from './context/decorators/service'
import { Get } from './context/decorators/endpoint'

@Service('/meta')
class MetaService extends Context {
  @Get('/roles/{roleId}')
  getRoles() {
    return Role.find()
  }
}

module.exports = MetaService