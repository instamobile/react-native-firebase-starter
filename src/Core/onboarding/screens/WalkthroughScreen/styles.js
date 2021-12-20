import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: 'white',
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white',
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 60,
      tintColor: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors[colorScheme].primaryForeground,
    },
    button: {
      fontSize: 18,
      color: 'white',
      marginTop: 10,
    },
  })
}

export default dynamicStyles
