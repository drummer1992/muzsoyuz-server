import querystring from 'querystring'
import { UnauthorizedError } from '../../errors'
import { Request } from '../../utils/http/request'
import { pick } from '../../utils/object'
import { ENV } from '../../config'

function OAuthErrorHandler(instance, serviceMethod, descriptor) {
  const method = descriptor.value

  descriptor.value = async function(...args) {
    try {
      return await method.apply(this, args)
    } catch (error) {
      throw new UnauthorizedError(error.message || error.error)
    }
  }

  return descriptor
}

/**
 * @typedef {Object} OAuthConfig
 * @property {String} redirect_uri
 * @property {String} client_id
 * @property {String} client_secret
 * @property {String} separator
 * @property {String[]} scope
 */

export class GenericOAuth {
  constructor(code) {
    this.code = code
  }

  static config = null

  static getLink(url, options) {
    const { separator } = this.config

    options.scope = options.scope.join(separator)

    return `${url}?${querystring.stringify(options)}`
  }

  fetchProfile() {
    throw new Error('Abstract method call')
  }

  mapResponse() {
    throw new Error('Abstract method call')
  }
}

export class FacebookOAuth extends GenericOAuth {
  /**
   * @type {OAuthConfig}
   */
  static config = {
    redirect_uri : ENV.FACEBOOK_REDIRECT_URI,
    client_id    : ENV.FACEBOOK_CLIENT_ID,
    client_secret: ENV.FACEBOOK_CLIENT_SECRET,
    separator    : ', ',
    idName       : 'facebookId',
    scope        : ['email', 'public_profile'],
  }

  static getLink() {
    const props = ['redirect_uri', 'client_id', 'scope']

    return super.getLink('https://www.facebook.com/v10.0/dialog/oauth', pick(this.config, props))
  }

  mapResponse(response) {
    return {
      facebookId: response.id,
      email     : response.email,
      name      : response.name,
      imageURL  : response.picture?.data?.url,
    }
  }

  @OAuthErrorHandler
  async fetchProfile() {
    const props = ['client_id', 'redirect_uri', 'client_secret']

    const { access_token } = await Request.get('https://graph.facebook.com/v10.0/oauth/access_token')
      .query({
        code: this.code,
        ...pick(this.constructor.config, props),
      })

    const response = await Request.get('https://graph.facebook.com/me')
      .query({
        fields: 'email, name, picture.type(large)',
        access_token,
      })

    return this.mapResponse(response)
  }
}

/**
 * @typedef {OAuthConfig} GoogleOAuthConfig
 * @property {String} access_type
 * @property {String} response_type
 * @property {String} prompt
 */

export class GoogleOAuth extends GenericOAuth {
  /**
   * @type {GoogleOAuthConfig}
   */
  static config = {
    redirect_uri : ENV.GOOGLE_REDIRECT_URI,
    client_id    : ENV.GOOGLE_CLIENT_ID,
    client_secret: ENV.GOOGLE_CLIENT_SECRET,
    access_type  : 'offline',
    response_type: 'code',
    prompt       : 'consent',
    grant_type   : 'authorization_code',
    separator    : ' ',
    idName       : 'googleId',
    scope        : [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  }

  static getLink() {
    const props = ['redirect_uri', 'client_id', 'access_type', 'response_type', 'prompt', 'scope']

    return super.getLink('https://accounts.google.com/o/oauth2/v2/auth', pick(this.config, props))
  }

  mapResponse(response) {
    return {
      googleId: response.id,
      email   : response.email,
      name    : response.name,
      imageURL: response.picture,
    }
  }

  @OAuthErrorHandler
  async fetchProfile() {
    const props = ['client_id', 'client_secret', 'redirect_uri', 'grant_type']

    const { id_token, access_token } = await Request.post('https://oauth2.googleapis.com/token')
      .query({
        code: this.code,
        ...pick(this.constructor.config, props),
      })

    const response = await Request.get('https://www.googleapis.com/oauth2/v1/userinfo')
      .setHeaders({ Authorization: `Bearer ${id_token}` })
      .query({ alt: 'json', access_token })

    return this.mapResponse(response)
  }
}
