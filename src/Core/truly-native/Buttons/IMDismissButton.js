import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'

const dismissImage = require('../../../assets/icons/dismiss-rounded.png')

export default function IMDismissButton(props) {
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

IMDismissButton.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func,
}
