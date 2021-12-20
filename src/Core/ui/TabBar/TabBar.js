import React from 'react'
import { SafeAreaView } from 'react-native'
import { useTheme } from 'dopenative'
import dynamicStyles from './styles'
import Tab from './Tab'

export function TabBarBuilder({ tabIcons, state, navigation }) {
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  return (
    <SafeAreaView style={styles.tabBarContainer}>
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
    </SafeAreaView>
  )
}

export default TabBarBuilder
