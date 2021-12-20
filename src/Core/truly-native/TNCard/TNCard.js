import React from 'react'
import { TouchableHighlight, View } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

const TNCard = ({ containerStyle, radius, onPress, children }) => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const containerStyles = [
    styles.tnCardContainer,
    radius && { borderRadius: radius },
    styles.tnCardShadow,
    containerStyle,
  ]

  return (
    <TouchableHighlight style={containerStyles} onPress={onPress}>
      <View>{children}</View>
    </TouchableHighlight>
  )
}

export default TNCard
