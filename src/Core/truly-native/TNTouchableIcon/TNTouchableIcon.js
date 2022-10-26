import React from 'react'
import { TouchableOpacity, Image, Text } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
function TNTouchableIcon(props) {
  const {
    onPress,
    containerStyle,
    iconSource,
    imageStyle,
    title,
    titleStyle,
    renderTitle,
    onLongPress,
    onPressOut,
    onPressIn,
    iconRef,
    onLayout,
    disabled = false,
  } = props
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <TouchableOpacity
      disabled={disabled}
      ref={iconRef}
      onLayout={onLayout}
      style={[styles.headerButtonContainer, containerStyle]}
      onLongPress={onLongPress}
      onPressOut={onPressOut}
      onPressIn={onPressIn}
      onPress={onPress}>
      <Image style={[styles.Image, imageStyle]} source={iconSource} />
      {renderTitle && <Text style={[styles.title, titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  )
}

export default TNTouchableIcon
