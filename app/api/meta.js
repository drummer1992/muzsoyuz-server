import Context from './context'
import { Service, Get } from 'decorated-routing/decorators'

@Service('/meta')
export default class MetaService extends Context {
  @Get('/roles')
  getRoles() {
    return Role.find()
  }
}