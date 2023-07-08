import { useEffect, useMemo } from 'react'
import { makeRedirectUri } from 'expo-auth-session'
import * as Facebook from 'expo-auth-session/providers/facebook'
import { ResponseType } from 'expo-auth-session'

// const useProxy = Constants.appOwnership === 'expo' ? true : false

const useFacebookAuth = config => {
  const redirectUri = useMemo(() => {
    return makeRedirectUri({
      native: `fb${config.facebookIdentifier}://authorize`,
    })
  }, [])

  const [request, response, promptAsync] = Facebook.useAuthRequest({
    expoClientId: config.facebookIdentifier,
    webClientId: config.facebookIdentifier,
    clientId: config.facebookIdentifier,
    scopes: ['public_profile', 'email'],
    redirectUri: redirectUri,
  })

  const getFacebookAccessToken = async () => {
    const result = await promptAsync()
    if (!result) {
      throw new Error('failed to login with Facebook')
    }

    console.log('Facebook res', result)

    return result.params?.access_token
  }

  return { getFacebookAccessToken }
}

export default useFacebookAuth
