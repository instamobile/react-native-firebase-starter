import { StyleSheet } from 'react-native'
import { Platform } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSet.primaryBackground,
    },
    logo: {
      width: 150,
      height: 150,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: -100,
    },
    logoImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      tintColor: colorSet.primaryForeground,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: colorSet.primaryForeground,
      marginTop: 20,
      marginBottom: 20,
      textAlign: 'center',
    },
    caption: {
      fontSize: 16,
      paddingHorizontal: 30,
      marginBottom: 20,
      textAlign: 'center',
      color: colorSet.secondaryText,
    },
    loginContainer: {
      width: '70%',
      backgroundColor: colorSet.primaryForeground,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
      justifyContent: 'center',
      height: 48,
    },
    loginText: {
      color: colorSet.primaryBackground,
    },
    signupContainer: {
      justifyContent: 'center',
      width: '70%',
      backgroundColor: colorSet.primaryBackground,
      borderRadius: 25,
      borderWidth: Platform.OS === 'ios' ? 0.5 : 1.0,
      borderColor: colorSet.primaryForeground,
      padding: 10,
      marginTop: 20,
      alignSelf: 'center',
      height: 45,
    },
    signupText: {
      color: colorSet.primaryForeground,
    },
    dismissButton: {
      position: 'absolute',
      top: 36,
      right: 24,
    },
  })
}

export default dynamicStyles
