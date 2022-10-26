import React, { useState, useEffect, useRef } from 'react'
import {
  Alert,
  Image,
  Keyboard,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Button from 'react-native-button'
import PhoneInput from 'react-native-phone-input'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme, useTranslations } from 'dopenative'
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication'
import TNActivityIndicator from '../../../truly-native/TNActivityIndicator'
import TNProfilePictureSelector from '../../../truly-native/TNProfilePictureSelector/TNProfilePictureSelector'
import CountriesModalPicker from '../../../truly-native/CountriesModalPicker/CountriesModalPicker'
import { setUserData } from '../../redux/auth'
import { useDispatch } from 'react-redux'
import { localizedErrorMessage } from '../../api/ErrorCode'
import TermsOfUseView from '../../components/TermsOfUseView'
import dynamicStyles from './styles'
import IMGoogleSignInButton from '../../components/IMGoogleSignInButton/IMGoogleSignInButton'
import { useOnboardingConfig } from '../../hooks/useOnboardingConfig'
import { useAuth } from '../../hooks/useAuth'

const codeInputCellCount = 6

const SmsAuthenticationScreen = props => {
  const { navigation, route } = props
  const {
    isSigningUp,
    isConfirmSignUpCode,
    isConfirmResetPasswordCode,
    email,
    userInfo,
  } = route.params

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const authManager = useAuth()
  const dispatch = useDispatch()

  const styles = dynamicStyles(theme, appearance)
  const { config } = useOnboardingConfig()

  const [inputFields, setInputFields] = useState({})
  const [loading, setLoading] = useState(false)
  const [isPhoneVisible, setIsPhoneVisible] = useState(
    !isConfirmSignUpCode && !isConfirmResetPasswordCode,
  )
  const [phoneNumber, setPhoneNumber] = useState(false)
  const [countriesPickerData, setCountriesPickerData] = useState(null)
  const [verificationId, setVerificationId] = useState(null)
  const [profilePictureFile, setProfilePictureFile] = useState(null)
  const [countryModalVisible, setCountryModalVisible] = useState(false)
  const [codeInputValue, setCodeInputValue] = useState('')

  const myCodeInput = useBlurOnFulfill({
    codeInputValue,
    value: codeInputValue,
    cellCount: codeInputCellCount,
  })
  const [codeInputProps, getCellOnLayoutHandler] = useClearByFocusCell({
    codeInputValue,
    value: codeInputValue,
    setCodeInputValue,
    setValue: setCodeInputValue,
  })

  const phoneRef = useRef(null)

  useEffect(() => {
    if (codeInputValue?.trim()?.length === codeInputCellCount) {
      onFinishCheckingCode(codeInputValue)
    }
  }, [codeInputValue])

  useEffect(() => {
    if (phoneRef && phoneRef.current) {
      setCountriesPickerData(phoneRef.current.getPickerData())
    }
  }, [phoneRef])

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

  const signInWithPhoneNumber = userValidPhoneNumber => {
    setLoading(true)
    authManager.sendSMSToPhoneNumber(userValidPhoneNumber).then(response => {
      setLoading(false)
      const confirmationResult = response.confirmationResult
      if (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult
        setVerificationId(confirmationResult.verificationId)
        setIsPhoneVisible(false)
      } else {
        // Error; SMS not sent
        Alert.alert(
          '',
          localizedErrorMessage(response.error, localized),
          [{ text: localized('OK') }],
          { cancelable: false },
        )
      }
    })
  }

  const trimFields = fields => {
    var trimmedFields = {}
    Object.keys(fields).forEach(key => {
      if (fields[key]) {
        trimmedFields[key] = fields[key].trim()
      }
    })
    return trimmedFields
  }

  const signUpWithPhoneNumber = smsCode => {
    const userDetails = {
      ...trimFields(inputFields),
      phone: phoneNumber?.trim(),
      photoFile: profilePictureFile,
    }
    authManager
      .registerWithPhoneNumber(
        userDetails,
        smsCode,
        verificationId,
        config.appIdentifier,
      )
      .then(response => {
        setLoading(false)
        if (response.error) {
          Alert.alert(
            '',
            localizedErrorMessage(response.error, localized),
            [{ text: localized('OK') }],
            { cancelable: false },
          )
        } else {
          const user = response.user
          dispatch(setUserData({ user }))
          Keyboard.dismiss()
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { user } }],
          })
        }
      })
  }


  const onPressSend = async () => {
    if (phoneRef.current.isValidNumber()) {
      const userValidPhoneNumber = phoneRef.current.getValue()
      setLoading(true)
      setPhoneNumber(userValidPhoneNumber)
      if (isSigningUp) {
        const { error } = await authManager.validateUsernameFieldIfNeeded(
          trimFields(inputFields),
          config,
        )

        if (error) {
          Alert.alert(
            '',
            localized(error),
            [{ text: localized('OK'), onPress: () => setLoading(false) }],
            {
              cancelable: false,
            },
          )
          return
        }
      }

      signInWithPhoneNumber(userValidPhoneNumber)
    } else {
      Alert.alert(
        '',
        localized('Please enter a valid phone number.'),
        [{ text: localized('OK') }],
        {
          cancelable: false,
        },
      )
    }
  }

  const onPressFlag = () => {
    setCountryModalVisible(true)
  }

  const onPressCancelContryModalPicker = () => {
    setCountryModalVisible(false)
  }

  const onFinishCheckingCode = newCode => {
    setLoading(true)
    if (isSigningUp) {
      signUpWithPhoneNumber(newCode)
      return
    }

    if (!isSigningUp) {
      authManager.loginWithSMSCode(newCode, verificationId).then(response => {
        if (response.error) {
          setLoading(false)
          Alert.alert(
            '',
            localizedErrorMessage(response.error, localized),
            [{ text: localized('OK') }],
            { cancelable: false },
          )
        } else {
          const user = response.user
          dispatch(setUserData({ user }))
          Keyboard.dismiss()
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainStack', params: { user } }],
          })
        }
      })
    }
  }

  const onChangeInputFields = (text, key) => {
    setInputFields(prevFields => ({
      ...prevFields,
      [key]: text,
    }))
  }

  const selectCountry = country => {
    phoneRef.current.selectCountry(country.iso2)
  }

  const renderPhoneInput = () => {
    return (
      <>
        <PhoneInput
          style={styles.InputContainer}
          flagStyle={styles.flagStyle}
          textStyle={styles.phoneInputTextStyle}
          ref={phoneRef}
          initialCountry={'us'}
          onPressFlag={onPressFlag}
          offset={10}
          allowZeroAfterCountryCode
          textProps={{
            placeholder: localized('Phone number'),
            placeholderTextColor: '#aaaaaa',
          }}
        />
        {countriesPickerData && (
          <CountriesModalPicker
            data={countriesPickerData}
            onChange={country => {
              selectCountry(country)
            }}
            cancelText={localized('Cancel')}
            visible={countryModalVisible}
            onCancel={onPressCancelContryModalPicker}
          />
        )}
        <Button
          containerStyle={styles.sendContainer}
          style={styles.sendText}
          onPress={() => onPressSend()}>
          {localized('Send code')}
        </Button>
      </>
    )
  }

  const renderCodeInputCell = ({ index, symbol, isFocused }) => {
    let textChild = symbol

    if (isFocused) {
      textChild = <Cursor />
    }

    return (
      <Text
        key={index}
        style={[styles.codeInputCell, isFocused && styles.focusCell]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    )
  }

  const renderCodeInput = () => {
    return (
      <View style={styles.codeFieldContainer}>
        <CodeField
          ref={myCodeInput}
          {...codeInputProps}
          value={codeInputValue}
          onChangeText={setCodeInputValue}
          cellCount={codeInputCellCount}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCodeInputCell}
        />
      </View>
    )
  }

  const renderInputField = (field, index) => {
    return (
      <TextInput
        key={index?.toString()}
        style={styles.InputContainer}
        placeholder={field.placeholder}
        placeholderTextColor="#aaaaaa"
        onChangeText={text => onChangeInputFields(text, field.key)}
        value={inputFields[field.key]}
        underlineColorAndroid="transparent"
      />
    )
  }

  const renderAsSignUpState = () => {
    return (
      <>
        <Text style={styles.title}>{localized('Create new account')}</Text>
        {!isConfirmSignUpCode && (
          <TNProfilePictureSelector
            setProfilePictureFile={setProfilePictureFile}
          />
        )}
        {!isConfirmSignUpCode && config.smsSignupFields.map(renderInputField)}
        {isPhoneVisible ? renderPhoneInput() : renderCodeInput()}
        {isConfirmSignUpCode && (
          <Text style={styles.orTextStyle}>
            {localized('Please check your e-mail for a confirmation code.')}
          </Text>
        )}
        {!isConfirmSignUpCode && (
          <>
            <Text style={styles.orTextStyle}> {localized('OR')}</Text>
            <Button
              containerStyle={styles.signWithEmailContainer}
              onPress={() => navigation.navigate('Signup')}>
              {localized('Sign up with E-mail')}
            </Button>
          </>
        )}
      </>
    )
  }

  const renderAsLoginState = () => {
    const appleButtonStyle = config.isAppleAuthEnabled
      ? {
          dark: AppleButton?.Style?.WHITE,
          light: AppleButton?.Style?.BLACK,
          'no-preference': AppleButton?.Style?.WHITE,
        }
      : {}

    return (
      <>
        {isConfirmResetPasswordCode ? (
          <Text style={styles.title}>{localized('Reset Password')}</Text>
        ) : (
          <Text style={styles.title}>{localized('Sign In')}</Text>
        )}
        {isPhoneVisible ? renderPhoneInput() : renderCodeInput()}
        {isConfirmResetPasswordCode && (
          <Text style={styles.orTextStyle}>
            {localized('Please check your e-mail for a confirmation code.')}
          </Text>
        )}
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
        <Button
          containerStyle={styles.signWithEmailContainer}
          onPress={() => navigation.navigate('Login')}>
          {localized('Sign in with E-mail')}
        </Button>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.backArrowStyle} source={theme.icons.backArrow} />
        </TouchableOpacity>
        {isSigningUp && renderAsSignUpState()}
        {!isSigningUp && renderAsLoginState()}
        {isSigningUp && (
          <TermsOfUseView
            tosLink={config.tosLink}
            privacyPolicyLink={config.privacyPolicyLink}
            style={styles.tos}
          />
        )}
      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator />}
    </View>
  )
}

export default SmsAuthenticationScreen
