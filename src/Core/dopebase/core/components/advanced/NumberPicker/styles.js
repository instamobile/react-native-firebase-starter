import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    containerView: {
      backgroundColor: colorSet.primaryBackground,
      flex: 1,
      flexDirection: 'row',
    },
    buttonContainer: {
      marginLeft: 20,
      marginRight: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colorSet.primaryText,
    },
    buttonImage: {
      width: 32,
      height: 32,
      tintColor: colorSet.primaryForeground,
    },
  })
}

export default dynamicStyles
