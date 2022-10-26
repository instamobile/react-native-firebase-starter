import React, { useState, useEffect } from 'react'
import Button from 'react-native-button'
import { Image, Keyboard, Platform, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import { useTheme, useTranslations } from 'dopenative'
import TNActivityIndicator from '../../../truly-native/TNActivityIndicator'
import dynamicStyles from './styles'
import { setUserData } from '../../redux/auth'
import { updateUser } from '../../../users'
import { IMDismissButton } from '../../../truly-native'
import { useOnboardingConfig } from '../../hooks/useOnboardingConfig'
import { useAuth } from '../../hooks/useAuth'
import useCurrentUser from '../../hooks/useCurrentUser'

const WelcomeScreen = props => {
  const { navigation } = props
  const currentUser = useCurrentUser()

  const dispatch = useDispatch()
  const { config } = useOnboardingConfig()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [isLoading, setIsLoading] = useState(true)

  const authManager = useAuth()

  const { title, caption } = props

  useEffect(() => {
    tryToLoginFirst()
  }, [])

  const handleInitialNotification = async () => {
    const userID = currentUser?.id || currentUser?.userID
    const intialNotification = await messaging().getInitialNotification()

    if (intialNotification && Platform.OS === 'android') {
      const {
        data: { channelID, type },
      } = intialNotification

      if (type === 'chat_message') {
        handleChatMessageType(channelID)
      }
    }

    if (userID && Platform.OS === 'ios') {
      updateUser(userID, { badgeCount: 0 })
    }
  }

  const tryToLoginFirst = async () => {
    authManager
      .retrievePersistedAuthUser(config)
      .then(response => {
        if (response?.user) {
          const user = response.user
          dispatch(
            setUserData({
              user: response.user,
            }),
          )
          Keyboard.dismiss()
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { user } }],
          })
          handleInitialNotification()
          return
        }
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }

  const handleChatMessageType = (channelID, name) => {
    const channel = {
      id: channelID,
      channelID,
      name,
    }

    navigation.navigate('PersonalChat', {
      channel,
      openedFromPushNotification: true,
    })
  }

  if (isLoading == true) {
    return <TNActivityIndicator />
  }

  return (
    <View style={styles.container}>
      {props.delayedMode && (
        <IMDismissButton
          style={styles.dismissButton}
          tintColor={theme.colors[appearance].primaryForeground}
          onPress={() => navigation.goBack()}
        />
      )}
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={
            props.delayedMode ? theme.icons.delayedLogo : theme.icons.logo
          }
        />
      </View>
      <Text style={styles.title}>
        {title ? title : config.onboardingConfig.welcomeTitle}
      </Text>
      <Text style={styles.caption}>
        {caption ? caption : config.onboardingConfig.welcomeCaption}
      </Text>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => {
          config.isSMSAuthEnabled
            ? navigation.navigate('LoginStack', {
                screen: 'Sms',
                params: {
                  isSigningUp: false,
                },
              })
            : navigation.navigate('LoginStack', {
                screen: 'Login',
              })
        }}>
        {localized('Log In')}
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => {
          config.isSMSAuthEnabled
            ? navigation.navigate('LoginStack', {
                screen: 'Sms',
                params: {
                  isSigningUp: true,
                },
              })
            : navigation.navigate('LoginStack', {
                screen: 'Signup',
              })
        }}>
        {localized('Sign Up')}
      </Button>
    </View>
  )
}

export default WelcomeScreen
