import React, { useState } from 'react'
import { View, Text, Switch } from 'react-native'
import { useTheme } from '../../../core'
import dynamicStyles from './styles'

export const FormSwitch = ({ title, isSelected = false, onToggleSwitch }) => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const [isEnabled, setIsEnabled] = useState(isSelected)
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    onToggleSwitch && onToggleSwitch(!isEnabled)
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Switch
        trackColor={{ false: 'rgb(159,159,159)', true: '#c6e9fe' }}
        thumbColor={isEnabled ? '#9CC9F1FF' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  )
}
