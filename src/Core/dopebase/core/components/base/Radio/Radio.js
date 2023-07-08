import React, { useState, memo } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { useDopebase } from '../../../theming'
import dynamicStyles from './styles'

export const Radio = ({
  value = false,
  onToggle,
  containerStyle,
  styles,
  width,
  height,
}) => {
  const [isEnabled, setIsEnabled] = useState(value)
  const toggle = () => {
    setIsEnabled(previousState => !previousState)
    onToggle && onToggle(!isEnabled)
  }

  const innerSizeStyle = {
    width: width || 24,
    height: height || 24,
    borderRadius: (width || 24) / 2,
  }

  const outerSizeStyle = {
    borderRadius: (width || 24) / 2 + 4,
  }

  return (
    <TouchableOpacity
      style={[styles.outerContainer, containerStyle, outerSizeStyle]}
      onPress={toggle}>
      <View
        style={
          isEnabled
            ? [styles.innerContainerSelected, innerSizeStyle]
            : [styles.innerContainerUnselected, innerSizeStyle]
        }></View>
    </TouchableOpacity>
  )
}

export default memo(useDopebase(Radio, dynamicStyles))
