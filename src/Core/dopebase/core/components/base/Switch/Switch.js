import React, { useState, memo } from 'react'
import { View, Switch as RNSwitch } from 'react-native'
import { useTheme, useDopebase } from '../../../../core/theming'

export const Switch = ({
  value = false,
  onToggleSwitch,
  containerStyle,
  ...allProps
}) => {
  const { theme, appearance } = useTheme()

  const [isEnabled, setIsEnabled] = useState(value)
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    onToggleSwitch && onToggleSwitch(!isEnabled)
  }

  return (
    <View style={containerStyle}>
      <RNSwitch
        trackColor={{
          false: 'rgb(159,159,159)',
          true: theme.colors[appearance].primaryForeground,
        }}
        thumbColor={
          isEnabled ? theme.colors[appearance].primaryBackground : '#f4f3f4'
        }
        onValueChange={toggleSwitch}
        value={isEnabled}
        {...allProps}
      />
    </View>
  )
}

export default memo(useDopebase(Switch))
