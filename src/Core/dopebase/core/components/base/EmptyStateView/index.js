import React from 'react'
import { View as RNView } from 'react-native'
import { useDopebase } from '../../../theming'
import Button from '../Button'
import { Text } from '../Text'
import { View } from '../View'
import dynamicStyles from './styles'

const EmptyStateView = props => {
  const { emptyStateConfig, styles } = props
  const {
    title,
    description,
    callToAction,
    onPress,
    imageView,
    containerStyle,
  } = emptyStateConfig

  return (
    <RNView style={containerStyle}>
      {imageView && <View style={styles.imageContainer}>{imageView}</View>}
      {title?.length && (
        <Text mt4 style={styles.title}>
          {title}
        </Text>
      )}
      {description?.length && (
        <Text style={styles.description}>{description}</Text>
      )}
      {callToAction?.length && (
        <View style={styles.buttonOuterContainer}>
          <Button
            text={callToAction}
            containerStyle={styles.buttonContainer}
            textStyle={styles.mainButtonText}
            onPress={onPress}
            mt4
            mb8
            fx1
            ml4
            mr4
          />
        </View>
      )}
    </RNView>
  )
}

export default useDopebase(EmptyStateView, dynamicStyles)
