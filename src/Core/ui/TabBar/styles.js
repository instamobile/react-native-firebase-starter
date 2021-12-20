import { StyleSheet } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  return StyleSheet.create({
    tabBarContainer: {
      ...ifIphoneX(
        {
          height: 80,
        },
        {
          height: 45,
        },
      ),
      backgroundColor: colorSet.primaryBackground,
      flexDirection: 'row',
      borderTopWidth: 0.5,
      borderTopColor: colorSet.hairline,
    },
    tabContainer: {
      backgroundColor: colorSet.primaryBackground,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabIcon: {
      ...ifIphoneX(
        {
          width: 25,
          height: 25,
        },
        {
          width: 22,
          height: 22,
        },
      ),
    },
    focusTintColor: {
      tintColor: colorSet.primaryForeground,
    },
    unFocusTintColor: {
      tintColor: colorSet.secondaryText,
    },
  })
}

export default dynamicStyles
