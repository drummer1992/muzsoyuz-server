import Context from './context'
import { Service } from './context/decorators/service'
import { Get, Post } from './context/decorators/endpoint'
import { AuthGuard } from './context/decorators/guards/auth-guard'
import signUp from '../workflows/api/auth/sign-up'
import signIn from '../workflows/api/auth/sign-in'
import { StatusCode as c } from '../constants/http'
import { StatusCode } from './context/decorators/status-code'
import { ValidationPipe } from '../errors/validation/decorator'
import { AuthSchema } from '../workflows/api/auth/schema'

@Service('/auth')
class AuthService extends Context {
  @Post('/signUp')
  @ValidationPipe(AuthSchema)
  @StatusCode(c.CREATED)
  signUp(credentials) {
    return signUp(credentials)
  }

  @Post('/signIn')
  @ValidationPipe(AuthSchema)
  signIn(credentials) {
    return signIn(credentials)
  }

  @Get('/verify')
  @AuthGuard
  verifyToken() {
    return this.getCurrentUser()
  }
}

module.exports = AuthService
