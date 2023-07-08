import React, { useMemo } from 'react'
import {
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useDopebase } from '../../../theming'
import dynamicStyles from './styles'

const KeyboardAvoidingView = props => {
  const { children, style, verticalOffset = 0 } = props

  const insets = useSafeAreaInsets()

  const Container = Platform.select({
    native: () => RNKeyboardAvoidingView,
    default: () => React.Fragment,
  })()

  const containerProps = useMemo(() => {
    return Platform.select({
      android: {
        behavior: 'height',
        useNativeDriver: true,
        style: style,
      },
      ios: {
        behavior: 'padding',
        useNativeDriver: true,
        animated: false,
        style: style,
        keyboardVerticalOffset:
          verticalOffset + 46 + Math.max(insets.bottom, 16),
      },
      default: {},
    })
  }, [])

  return <Container {...containerProps}>{children}</Container>
}

export default React.memo(useDopebase(KeyboardAvoidingView, dynamicStyles))
