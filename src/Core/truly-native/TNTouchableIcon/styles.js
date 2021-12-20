import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  return StyleSheet.create({
    headerButtonContainer: {
      padding: 10,
    },
    Image: {
      width: 25,
      height: 25,
      margin: 6,
    },
    title: {
      color: theme.colors[colorScheme].primaryText,
      fontSize: 12,
    },
  })
}

export default dynamicStyles
