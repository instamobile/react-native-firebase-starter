import React, { memo } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'

const TNEmptyStateView = memo(props => {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const { emptyStateConfig } = props
  return (
    <View style={[props.style, styles.container]}>
      <Text style={styles.title}>{emptyStateConfig.title}</Text>
      <Text style={styles.description}>{emptyStateConfig.description}</Text>
      {emptyStateConfig.buttonName && emptyStateConfig.buttonName.length > 0 && (
        <TouchableOpacity
          onPress={emptyStateConfig.onPress}
          style={styles.buttonContainer}>
          <Text style={styles.buttonName}>{emptyStateConfig.buttonName}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
})

export default TNEmptyStateView
