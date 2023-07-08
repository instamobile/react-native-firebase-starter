import React from 'react'
import { View as RNView } from 'react-native'
import { useSpacing } from '../../../hooks/useSpacing'
import { useDopebase } from '../../../theming'
import dynamicStyles from './styles'

const View = props => {
  const { children, style } = props

  const spacingStyles = useSpacing(props)

  const viewStyles = [...spacingStyles, style]

  return <RNView style={viewStyles}>{children}</RNView>
}

export default React.memo(useDopebase(View, dynamicStyles))
