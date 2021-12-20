import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

const assets = {
  plusIcon: require('./assets/plus-icon.png'),
  minusIcon: require('./assets/minus-icon.png'),
}

const TNNumberPicker = props => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { initialValue = 1, maxValue = 1000, minValue = 0, onChange } = props
  const [value, setValue] = useState(initialValue)

  const onDecrement = () => {
    if (value > minValue) {
      setValue(value - 1)
      onChange(value - 1)
    }
  }

  const onIncrement = () => {
    if (value < maxValue) {
      setValue(value + 1)
      onChange(value + 1)
    }
  }

  return (
    <View style={[props.style, styles.containerView]}>
      <TouchableOpacity onPress={onDecrement} style={styles.buttonContainer}>
        <Image source={assets.minusIcon} style={styles.buttonImage} />
      </TouchableOpacity>
      <Text style={styles.title}>{value}</Text>
      <TouchableOpacity onPress={onIncrement} style={styles.buttonContainer}>
        <Image source={assets.plusIcon} style={styles.buttonImage} />
      </TouchableOpacity>
    </View>
  )
}

export default TNNumberPicker
