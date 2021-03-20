import Context from './context'
import { Service } from './context/decorators/service'
import { Get, Post } from './context/decorators/endpoint'
import { AuthGuard } from './context/decorators/guards/auth-guard'
import signUp from '../workflows/api/auth/sign-up'
import signIn from '../workflows/api/auth/sign-in'
import { StatusCode as c } from '../constants/http'
import { StatusCode } from './context/decorators/status-code'
import { AuthSchema } from '../workflows/api/auth/schema'
import { BodyValidationPipe } from './context/decorators/validation'

@Service('/auth')
export default class AuthService extends Context {
  @Post('/signUp')
  @BodyValidationPipe(AuthSchema)
  @StatusCode(c.CREATED)
  signUp() {
    return signUp(this.request.body)
  }

  @Post('/signIn')
  @BodyValidationPipe(AuthSchema)
  signIn() {
    return signIn(this.request.body)
  }

  @Get('/verify')
  @AuthGuard
  verifyToken() {
    return this.getCurrentUser()
  }
}