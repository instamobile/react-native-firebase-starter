import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

function IMIconButton(props) {
  const { tintColor, onPress, source, marginRight, width, height } = props
  return (
    <TouchableOpacity style={{ marginRight: marginRight }} onPress={onPress}>
      <Image
        style={{ width: width, height: height, tintColor: tintColor }}
        source={source}
      />
    </TouchableOpacity>
  )
}

export default IMIconButton
