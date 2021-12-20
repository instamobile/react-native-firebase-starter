import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      alignSelf: 'center',
      color: colorSet.primaryText,
      marginBottom: 15,
    },
    description: {
      alignSelf: 'center',
      color: colorSet.primaryText,
      textAlign: 'center',
      width: '85%',
      lineHeight: 20,
    },
    buttonContainer: {
      backgroundColor: colorSet.primaryForeground,
      width: '75%',
      height: 45,
      alignSelf: 'center',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
    buttonName: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    container: {
      backgroundColor: 'transparent',
    },
  })
}

export default dynamicStyles
