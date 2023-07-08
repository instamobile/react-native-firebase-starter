import React from 'react'
import { TouchableOpacity, Image } from 'react-native'

const dismissImage = require('./dismiss-rounded.png')

export function DismissButton(props) {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      <Image
        style={{
          resizeMode: 'cover',
          width: 40,
          height: 40,
          tintColor: props.tintColor,
        }}
        source={dismissImage}
      />
    </TouchableOpacity>
  )
}
