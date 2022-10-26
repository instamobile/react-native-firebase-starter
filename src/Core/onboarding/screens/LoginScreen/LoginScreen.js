import React, { useState } from 'react'
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Button from 'react-native-button'
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication'
import IMGoogleSignInButton from '../../components/IMGoogleSignInButton/IMGoogleSignInButton'
import { useDispatch } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TNActivityIndicator from '../../../truly-native/TNActivityIndicator'
import dynamicStyles from './styles'
import { setUserData } from '../../redux/auth'
import { localizedErrorMessage } from '../../api/ErrorCode'
import { useOnboardingConfig } from '../../hooks/useOnboardingConfig'
import { useAuth } from '../../hooks/useAuth'

const LoginScreen = props => {
  const { navigation } = props
  const authManager = useAuth()

  const dispatch = useDispatch()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const { config } = useOnboardingConfig()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const styles = dynamicStyles(theme, appearance)

  const onPressLogin = () => {
    setLoading(true)
    authManager
      .loginWithEmailAndPassword(
        email && email.trim(),
        password && password.trim(),
        config,
      )
      .then(response => {
        if (response?.user) {
          const user = response.user
          dispatch(setUserData({ user }))
          Keyboard.dismiss()
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { user } }],
          })
        } else {
          setLoading(false)
          Alert.alert(
            '',
            localizedErrorMessage(response.error, localized),
            [{ text: localized('OK') }],
            {
              cancelable: false,
            },
          )
        }
      })
  }

  const onFBButtonPress = () => {
    setLoading(true)
    authManager.loginOrSignUpWithFacebook(config).then(response => {
      if (response?.user) {
        const user = response.user
        dispatch(setUserData({ user }))
        Keyboard.dismiss()
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user } }],
        })
      } else {
        setLoading(false)
        Alert.alert(
          '',
          localizedErrorMessage(response.error, localized),
          [{ text: localized('OK') }],
          {
            cancelable: false,
          },
        )
      }
    })
  }

  const onGoogleButtonPress = () => {
    setLoading(true)
    authManager.loginOrSignUpWithGoogle(config).then(response => {
      if (response?.user) {
        const user = response.user
        dispatch(setUserData({ user }))
        Keyboard.dismiss()
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user } }],
        })
      } else {
        setLoading(false)
        Alert.alert(
          '',
          localizedErrorMessage(response.error, localized),
          [{ text: localized('OK') }],
          {
            cancelable: false,
          },
        )
      }
    })
  }

  const onAppleButtonPress = async () => {
    setLoading(true)
    authManager.loginOrSignUpWithApple(config).then(response => {
      if (response?.user) {
        const user = response.user
        dispatch(setUserData({ user }))
        Keyboard.dismiss()
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack', params: { user } }],
        })
      } else {
        setLoading(false)
        Alert.alert(
          '',
          localizedErrorMessage(response.error, localized),
          [{ text: localized('OK') }],
          {
            cancelable: false,
          },
        )
      }
    })
  }

  const onForgotPassword = async () => {
    navigation.push('ResetPassword', {
      isResetPassword: true,
    })
  }

  const appleButtonStyle = config.isAppleAuthEnabled
    ? {
        dark: AppleButton?.Style?.WHITE,
        light: AppleButton?.Style?.BLACK,
        'no-preference': AppleButton?.Style?.WHITE,
      }
    : {}

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity
          style={{ alignSelf: 'flex-start' }}
          onPress={() => navigation.goBack()}>
          <Image style={styles.backArrowStyle} source={theme.icons.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>{localized('Sign In')}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={localized('E-mail')}
          keyboardType="email-address"
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputContainer}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          placeholder={localized('Password')}
          onChangeText={text => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        {config.forgotPasswordEnabled && (
          <View style={styles.forgotPasswordContainer}>
            <Button
              style={styles.forgotPasswordText}
              onPress={() => onForgotPassword()}>
              {localized('Forgot password?')}
            </Button>
          </View>
        )}
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          onPress={() => onPressLogin()}>
          {localized('Log In')}
        </Button>
        {config.isFacebookAuthEnabled && (
          <>
            <Text style={styles.orTextStyle}> {localized('OR')}</Text>
            <Button
              containerStyle={styles.facebookContainer}
              style={styles.facebookText}
              onPress={() => onFBButtonPress()}>
              {localized('Login With Facebook')}
            </Button>
          </>
        )}
        {config.isGoogleAuthEnabled && (
          <IMGoogleSignInButton
            containerStyle={styles.googleButtonStyle}
            onPress={onGoogleButtonPress}
          />
        )}
        {config.isAppleAuthEnabled && appleAuth.isSupported && (
          <AppleButton
            cornerRadius={25}
            style={styles.appleButtonContainer}
            buttonStyle={appleButtonStyle[appearance]}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={() => onAppleButtonPress()}
          />
        )}
        {config.isSMSAuthEnabled && (
          <Button
            containerStyle={styles.phoneNumberContainer}
            onPress={() => navigation.navigate('Sms', { isSigningUp: false })}>
            {localized('Login with phone number')}
          </Button>
        )}

        {loading && <TNActivityIndicator />}
      </KeyboardAwareScrollView>
    </View>
  )
}

export default LoginScreen
