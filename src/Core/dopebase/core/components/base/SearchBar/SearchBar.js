import React, { memo } from 'react'
import {
  SafeAreaView,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native'
import { Text } from '../Text'
import { useSpacing } from '../../../hooks/useSpacing'
import { useDopebase } from '../../../theming'
import dynamicStyles from './styles'

const SearchBar = props => {
  const {
    onChangeText,
    onSearchButtonPress,
    onCancelButtonPress,
    searchRef,
    placeholder,
    cancelButtonTitle = 'Cancel',
    showsCancelButton = true,
    containerStyle,
    textInputStyle,
    cancelButtonStyle,
    capitalized = false,
    styles,
    autoFocus,
    defaultValue,
  } = props

  const spacingStyles = useSpacing(props)
  const [value, setValue] = React.useState(defaultValue ?? '')

  const textInputStyles = [
    ...spacingStyles,
    textInputStyle ?? {},
    styles.textInput,
  ]

  const safeAreaVewStyle = containerStyle
    ? [styles.container, containerStyle]
    : [styles.container]
  const cancelStyle = cancelButtonStyle
    ? [styles.cancelButtonText, cancelButtonStyle]
    : [styles.cancelButtonText]

  return (
    <SafeAreaView style={safeAreaVewStyle}>
      <RNTextInput
        style={textInputStyles}
        placeholder={placeholder}
        placeholderTextColor="#aaaaaa"
        onChangeText={text => {
          setValue(text)
          onChangeText(text)
        }}
        value={value}
        underlineColorAndroid="transparent"
        autoCapitalize={capitalized ? 'words' : 'none'}
        autoFocus={autoFocus}
      />
      {showsCancelButton && (
        <TouchableOpacity
          style={styles.cancelButtonContainer}
          onPress={() => {
            setValue('')
            onChangeText('')
            onCancelButtonPress()
          }}>
          <Text style={cancelStyle}>{cancelButtonTitle}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}

export default memo(useDopebase(SearchBar, dynamicStyles))
