import React, { useMemo } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '../../dopebase'
import dynamicStyles from './styles'
import Tab from './Tab'

export function TabBarBuilder({ tabIcons, state, navigation, descriptors }) {
  const insets = useSafeAreaInsets()

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const focusedOptions =
    descriptors &&
    descriptors[state?.routes[state?.index]?.key]?.options?.tabBarStyle?.display

  const containerStyle = useMemo(() => {
    if (insets.bottom) {
      return {
        paddingBottom: insets.bottom,
        minHeight: 80,
      }
    }
    return {
      paddingBottom: 16,
      minHeight: 45,
    }
  }, [insets.bottom])

  if (focusedOptions === undefined) {
    return (
      <View style={[styles.tabBarContainer, containerStyle]}>
        {state.routes.map((route, index) => {
          return (
            <Tab
              key={index + ''}
              route={state.routes[index]}
              tabIcons={tabIcons}
              focus={state.index === index}
              onPress={() => navigation.navigate(route.name)}
            />
          )
        })}
      </View>
    )
  } else {
    return null
  }
}

export default TabBarBuilder
