import Context from './context'
import { Service } from './context/decorators/service'
import { Get } from './context/decorators/endpoint'
import oAuth from '../workflows/api/oauth'
import { Logger } from './context/decorators/logger'

@Logger
@Service('/oauth')
class OAuthService extends Context {
  @Get('/link/google')
  getGoogleLink() {
    return oAuth.google.getLink()
  }

  @Get('/callback/google')
  googleCallback() {
    return oAuth.google.signIn(this.request.queryParams.code)
  }

  @Get('/link/facebook')
  getFacebookLink() {
    return oAuth.facebook.getLink()
  }

  @Get('/callback/facebook')
  facebookCallback() {
    return oAuth.facebook.signIn(this.request.queryParams.code)
  }
}

module.exports = OAuthService
