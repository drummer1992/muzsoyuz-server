import createUser from '../user/profile/create'
import { sign } from '../../utils/http/jwt'

/**
 *
 * @param {GenericOAuth} oauthClient
 * @returns {Promise<{token: (undefined|*)}>}
 */
const callbackHandler = async oauthClient => {
  const profile = await oauthClient.fetchProfile()

  const { idName } = oauthClient.constructor.config

  let user = await User.findOne({
    $or: [
      { [idName]: profile[idName] },
      { email: profile.email },
    ]
  })

  if (!user) {
    user = await createUser(profile)
  }

  if (user && !user[idName]) {
    user[idName] = profile[idName]
    user.email = user.email || profile.email
    user.name = user.name || profile.name
    user.imageURL = user.imageURL || profile.imageURL

    await user.save()
  }

  return sign({ _id: user._id })
}

export default callbackHandler
