import React from 'react'
import { Image, Text, TouchableHighlight, View } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

const IMMenuButton = props => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={[styles.btnClickContain, props.containerStyle]}
      underlayColor={styles.btnClickContain.backgroundColor}>
      <View style={styles.btnContainer}>
        {props.source && <Image source={props.source} style={styles.btnIcon} />}
        <Text style={styles.btnText}>{props.title}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default IMMenuButton
