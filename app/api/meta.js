import Context from './context'
import { Service } from './context/decorators/service'
import { Get } from './context/decorators/endpoint'

@Service('/meta')
export default class MetaService extends Context {
  @Get('/roles')
  getRoles() {
    return Role.find()
  }
}