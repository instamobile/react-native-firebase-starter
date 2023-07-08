import * as Google from 'expo-auth-session/providers/google'

const useGoogleAuth = config => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    webClientId: config.webClientId,
    expoClientId: config.expoClientId,
    scopes: [
      'profile',
      'email',
      'openid',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
  })

  const getGoogleIdToken = async () => {
    const result = await promptAsync()
    if (!result) {
      throw new Error('failed to login with Google')
    }

    console.log('google res', result)

    return result.params?.id_token
  }

  return { getGoogleIdToken }
}

export default useGoogleAuth
