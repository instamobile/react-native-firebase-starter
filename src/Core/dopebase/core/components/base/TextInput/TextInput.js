import React, { memo } from 'react'
import { TextInput as RNTextInput } from 'react-native'
import { useSpacing } from '../../../hooks/useSpacing'
import { useDopebase } from '../../../theming'
import dynamicStyles from './styles'

const TextInput = props => {
  const {
    style,
    capitalized,
    value,
    onChange,
    keyboardType,
    placeholder,
    password,
    styles,
  } = props

  const spacingStyles = useSpacing(props)

  const textStyles = [styles.textInput, ...spacingStyles, style]

  console.log(textStyles)

  if (password) {
    return (
      <RNTextInput
        style={textStyles}
        placeholder={placeholder}
        keyboardType={keyboardType}
        placeholderTextColor="#aaaaaa"
        onChangeText={onChange}
        value={value}
        underlineColorAndroid="transparent"
        autoCapitalize={capitalized ? 'words' : 'none'}
        secureTextEntry
      />
    )
  }

  return (
    <RNTextInput
      style={textStyles}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor="#aaaaaa"
      onChangeText={onChange}
      value={value}
      underlineColorAndroid="transparent"
      autoCapitalize={capitalized ? 'words' : 'none'}
    />
  )
}

export default memo(useDopebase(TextInput, dynamicStyles))
