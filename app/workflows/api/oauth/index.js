import assert from 'assert'
import { GoogleOAuth, FacebookOAuth } from '../../oauth'
import callbackHandler from '../../oauth/callback-handler'

const oAuth = OAuthClient => {
  assert(OAuthClient === GoogleOAuth || OAuthClient === FacebookOAuth,
    'OauthClient not valid')

  return {
    getLink: () => OAuthClient.getLink(),
    signIn : code => callbackHandler(new OAuthClient(code))
  }
}

oAuth.google = oAuth(GoogleOAuth)
oAuth.facebook = oAuth(FacebookOAuth)

export default oAuth
