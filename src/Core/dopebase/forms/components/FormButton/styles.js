import { StyleSheet, Platform, Dimensions } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  const windowWidth = Dimensions.get('window').width
  return StyleSheet.create({
    btnContainer: {
      marginTop: 30,
      paddingVertical: 8,
      backgroundColor: colorSet.primaryForeground,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      ...Platform.select({
        web: {
          width: '40%',
        },
        default: {
          alignSelf: 'center',
          width: '80%',
        },
      }),
    },
    title: {
      paddingVertical: 10,
      fontSize: 18,
      color: colorSet.foregroundContrast,
    },
  })
}

export default dynamicStyles
