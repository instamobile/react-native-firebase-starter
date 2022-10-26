import React, { useState } from 'react'
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  Alert,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme, useTranslations } from 'dopenative'
import Button from 'react-native-button'
import TNActivityIndicator from '../../../truly-native/TNActivityIndicator/TNActivityIndicator'
import dynamicStyles from './styles'
import { useAuth } from '../../hooks/useAuth'
import { localizedErrorMessage } from '../../api/ErrorCode'

const ResetPasswordScreen = props => {
  const authManager = useAuth()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSendPasswordResetEmail = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const isValidEmail = re.test(email?.trim())

    if (isValidEmail) {
      setIsLoading(true)
      authManager.sendPasswordResetEmail(email.trim()).then(response => {
        setIsLoading(false)

        if (response.error) {
          return Alert.alert(
            '',
            localizedErrorMessage(response.error, localized),
            [{ text: localized('OK') }],
            {
              cancelable: false,
            },
          )
        }

        Alert.alert(
          localized('Link sent successfully'),
          localized(
            'Kindly check your email and follow the link to reset your password.',
          ),
          [
            {
              text: localized('OK'),
              onPress: () => props.navigation.goBack(),
            },
          ],
          { cancelable: false },
        )
      })
    } else {
      Alert.alert(
        localized('Invalid email'),
        localized('The email entered is invalid. Please try again'),
        [{ text: localized('OK') }],
        { cancelable: false },
      )
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image style={styles.backArrowStyle} source={theme.icons.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>{localized('Reset Password')}</Text>
        <TextInput
          style={styles.InputContainer}
          placeholder={localized('E-mail')}
          placeholderTextColor="#aaaaaa"
          onChangeText={text => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Button
          containerStyle={styles.sendContainer}
          style={styles.sendText}
          onPress={() => onSendPasswordResetEmail()}>
          {localized('Send')}
        </Button>
      </KeyboardAwareScrollView>
      {isLoading && <TNActivityIndicator />}
    </View>
  )
}

export default ResetPasswordScreen
