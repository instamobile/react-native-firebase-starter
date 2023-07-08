import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import { useSpacing } from '../../../hooks/useSpacing'
import { useDopebase } from '../../../theming'
import dynamicStyles from './styles'

const Card = props => {
  const {
    containerStyle,
    radius,
    onPress,
    styles,
    theme,
    appearance,
    children,
  } = props

  const spacingStyles = useSpacing(props)

  const containerStyles = [
    styles.tnCardContainer,
    radius && { borderRadius: radius },
    styles.tnCardShadow,
    ...spacingStyles,
    containerStyle,
  ]

  return (
    <TouchableHighlight style={containerStyles} onPress={onPress}>
      <View>{children}</View>
    </TouchableHighlight>
  )
}

export default useDopebase(Card, dynamicStyles)
