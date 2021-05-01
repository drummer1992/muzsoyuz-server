import Context from './context'
import { AuthGuard } from './decorators/guards/auth-guard'
import signUp from '../workflows/api/auth/sign-up'
import signIn from '../workflows/api/auth/sign-in'
import { AuthSchema } from '../workflows/api/auth/schema'
import { BodyValidationPipe } from './decorators/validation'
import { Service, StatusCode, Post, Get } from 'decorated-routing/decorators'
import c from 'decorated-routing/codes'

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