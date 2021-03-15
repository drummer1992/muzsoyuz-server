import Context from './context'
import { Service } from './context/decorators/service'
import { Get } from './context/decorators/endpoint'
import oAuth from '../workflows/api/oauth'
import { StatusCode as c } from '../constants/http'
import { StatusCode } from './context/decorators/status-code'

@Service('/oauth')
export default class OAuthService extends Context {
  @Get('/google/link')
  @StatusCode(c.FOUND)
  getGoogleLink() {
    this.setHeaders({ Location: oAuth.google.getLink() })
  }

  @Get('/google/callback')
  googleCallback() {
    return oAuth.google.signIn(this.request.queryParams.code)
  }

  @Get('/facebook/link')
  @StatusCode(c.FOUND)
  getFacebookLink() {
    this.setHeaders({ Location: oAuth.facebook.getLink() })
  }

  @Get('/facebook/callback')
  facebookCallback() {
    return oAuth.facebook.signIn(this.request.queryParams.code)
  }
}
