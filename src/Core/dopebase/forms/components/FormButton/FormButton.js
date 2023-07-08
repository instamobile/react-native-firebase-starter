import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { useTheme } from '../../../core'
import { useTranslations } from '../../..'
import dynamicStyles from './styles'

export const FormButton = ({ title, onPress = () => {} }) => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Text style={styles.title}>{localized(title)}</Text>
    </TouchableOpacity>
  )
}
