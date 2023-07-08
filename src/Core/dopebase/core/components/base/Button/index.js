import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { useSpacing } from '../../../hooks/useSpacing'
import { useDopebase, useTheme } from '../../../theming'
import dynamicStyles from './styles'

const Button = props => {
  const {
    containerStyle,
    textStyle,
    text,
    radius,
    onPress,
    styles,
    secondary,
    shadow,
    loading,
  } = props
  const spacingStyles = useSpacing(props)
  const { theme, appearance } = useTheme()

  const containerStyles = [
    styles.DNButtonContainer,
    { borderRadius: radius ?? theme.button.borderRadius },
    secondary && {
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderColor: theme.colors[appearance].primaryForeground,
      borderWidth: 1,
    },
    ...spacingStyles,
    shadow && styles.DNButtonShadow,
    containerStyle,
  ]

  const textStyles = [
    styles.DNButtonText,
    secondary && { color: theme.colors[appearance].primaryForeground },
    textStyle,
  ]

  return (
    <TouchableOpacity style={containerStyles} onPress={onPress}>
      {!loading && text && <Text style={textStyles}>{text}</Text>}
      {loading && <ActivityIndicator size="small" />}
    </TouchableOpacity>
  )
}

export default useDopebase(Button, dynamicStyles)
