import React from 'react'
import { TextInput, View, Text } from 'react-native'
import { useTheme, useTranslations } from '../../../core'
import dynamicStyles from './styles'

export const FormTextInput = ({ title, type, onChangeText, value }) => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{localized(title)}</Text>
      </View>
      <TextInput
        style={styles.inputContainer}
        keyboardType={type}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}
