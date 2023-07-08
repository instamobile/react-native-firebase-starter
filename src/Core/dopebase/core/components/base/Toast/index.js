import React, { forwardRef, useEffect, useImperativeHandle } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'
import { useSpacing } from '../../../hooks/useSpacing'
import { useDopebase } from '../../../theming'
import dynamicStyles from './styles'

const ToastContent = props => {
  const {
    containerStyle,
    textStyle,
    actionStyle,
    text,
    action,
    onAction,
    radius,
    onPress,
    styles,
    theme,
    appearance,
  } = props

  const spacingStyles = useSpacing(props)

  const containerStyles = [
    styles.tnToastContainer,
    radius && { borderRadius: radius },
    styles.tnToastShadow,
    ...spacingStyles,
    containerStyle,
  ]

  const textStyles = [styles.tnToastContent, textStyle]

  const actionStyles = [styles.tnToastPrimaryAction, actionStyle]

  return (
    <TouchableHighlight style={containerStyles} onPress={onPress}>
      <View style={styles.tnToastInnerContainer}>
        <Text style={textStyles}>{text}</Text>
        <Text style={actionStyles} onPress={onAction}>
          {action}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

const Toast = Component =>
  forwardRef((props, myRef) => {
    const [isVisible, setIsVisible] = React.useState(false)

    useImperativeHandle(myRef, () => ({
      show: () => {
        setIsVisible(true)
      },
      hide: () => {
        setIsVisible(false)
      },
    }))

    useEffect(() => {
      if (isVisible) {
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      }
    }, [isVisible])

    if (!isVisible) {
      return null
    }
    return <Component {...props} />
  })
// export default useDopebase(TNToast, dynamicStyles)
export default Toast(useDopebase(ToastContent, dynamicStyles))
