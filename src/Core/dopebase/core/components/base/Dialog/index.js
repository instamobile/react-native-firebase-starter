import React, { forwardRef, useImperativeHandle } from 'react'

import { TouchableHighlight, View } from 'react-native'
import { useSpacing } from '../../../hooks/useSpacing'
import { useDopebase } from '../../../theming'
import dynamicStyles from './styles'
import Button from '../Button'
import { Text } from '../Text'

const DialogContent = props => {
  const {
    containerStyle,
    titleStyle,
    messageStyle,
    iconStyle,
    title,
    message,
    icon,
    actions,
    onClose,
    styles,
    theme,
    appearance,
  } = props

  const spacingStyles = useSpacing(props)

  const containerStyles = [
    styles.tnDialogContainer,
    styles.tnDialogShadow,
    ...spacingStyles,
    containerStyle,
  ]

  const titleStyles = [styles.tnDialogTitle, titleStyle]
  const messageStyles = [styles.tnDialogMessage, messageStyle]

  return (
    <TouchableHighlight style={containerStyles}>
      <View style={styles.tnDialogInnerContainer}>
        <Text style={titleStyles} mb8>
          {title}
        </Text>
        <Text style={messageStyles} mb8>
          {message}
        </Text>
        <View style={styles.tnActionsContainer}>
          {actions.map((action, index) => {
            if (action.secondary) {
              return (
                <Button
                  text={action.title}
                  onPress={action.onPress}
                  secondary
                  ml1
                  mr1
                  fx1
                  key={index}
                />
              )
            }
            if (action.destructive) {
              return (
                <Button
                  containerStyle={styles.tnDestructiveButton}
                  textStyle={styles.tnDestructiveButtonText}
                  text={action.title}
                  onPress={action.onPress}
                  secondary
                  ml2
                  mr2
                  fx1
                  key={index}
                />
              )
            }
            return (
              <Button
                text={action.title}
                onPress={action.onPress}
                ml2
                mr2
                fx1
                key={index}
              />
            )
          })}
        </View>
      </View>
    </TouchableHighlight>
  )
}

const Dialog = Component =>
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

    if (!isVisible) {
      return null
    }
    return <Component {...props} />
  })
export default Dialog(useDopebase(DialogContent, dynamicStyles))
