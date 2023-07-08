import React from 'react'
import { Image } from 'react-native'
import { useDopebase } from '../../../theming'
import { View } from '../View'
import dynamicStyles from './styles'

const DNImage = props => {
  const { children, style, rounded, source } = props
  const viewStyles = [style, rounded ? { borderRadius: 100000 } : null]

  return (
    <View {...props}>
      <Image source={source} style={viewStyles}>
        {children}
      </Image>
    </View>
  )
}

export default React.memo(useDopebase(DNImage, dynamicStyles))
