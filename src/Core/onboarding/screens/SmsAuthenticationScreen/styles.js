import { Dimensions, I18nManager, StyleSheet } from 'react-native'

const width = Dimensions.get('window').width

const codeInptCellWidth = width * 0.13

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSet.primaryBackground,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: colorSet.primaryForeground,
      marginTop: 25,
      marginBottom: 50,
      alignSelf: 'stretch',
      textAlign: 'left',
      marginLeft: 35,
    },
    sendContainer: {
      width: '70%',
      backgroundColor: colorSet.primaryForeground,
      borderRadius: 25,
      padding: 10,
      marginTop: 30,
      alignSelf: 'center',
    },
    sendText: {
      color: '#ffffff',
    },
    InputContainer: {
      height: 42,
      borderWidth: 1,
      borderColor: colorSet.grey3,
      backgroundColor: colorSet.primaryBackground,
      paddingLeft: 10,
      color: colorSet.primaryText,
      width: '80%',
      alignSelf: 'center',
      marginTop: 20,
      alignItems: 'center',
      borderRadius: 25,
    },

    flagStyle: {
      width: 35,
      height: 25,
      borderColor: colorSet.primaryText,
      borderBottomLeftRadius: 25,
      borderTopLeftRadius: 25,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
    phoneInputTextStyle: {
      borderLeftWidth: I18nManager.isRTL ? 0 : 1,
      borderRightWidth: I18nManager.isRTL ? 1 : 0,
      borderLeftWidth: 1,
      borderColor: colorSet.grey3,
      height: 42,
      fontSize: 15,
      color: colorSet.primaryText,
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      borderBottomRightRadius: I18nManager.isRTL ? 0 : 25,
      borderTopRightRadius: 25,
      borderTopRightRadius: I18nManager.isRTL ? 0 : 25,
      borderBottomLeftRadius: I18nManager.isRTL ? 25 : 0,
      borderTopLeftRadius: I18nManager.isRTL ? 25 : 0,
      paddingLeft: 10,
    },
    input: {
      flex: 1,
      borderLeftWidth: 1,
      borderRadius: 3,
      borderColor: colorSet.grey3,
      color: colorSet.primaryText,
      fontSize: 17,
      fontWeight: '700',
      backgroundColor: colorSet.primaryBackground,
    },
    // code input style
    root: {
      padding: 20,
      minHeight: 300,
      alignItems: 'center',
    },
    codeFieldContainer: {
      marginTop: 20,
      alignItems: 'center',
    },
    codeInputCell: {
      width: codeInptCellWidth,
      height: codeInptCellWidth,
      lineHeight: 55,
      fontSize: 26,
      fontWeight: '400',
      textAlign: 'center',
      marginLeft: 8,
      borderRadius: 6,
      backgroundColor: colorSet.grey3,
    },
    focusCell: {
      borderColor: '#000',
    },
    orTextStyle: {
      marginTop: 40,
      marginBottom: 10,
      alignSelf: 'center',
      color: colorSet.primaryText,
    },
    facebookContainer: {
      width: '70%',
      backgroundColor: '#4267b2',
      borderRadius: 25,
      marginTop: 30,
      alignSelf: 'center',
      padding: 10,
    },
    googleButtonStyle: {
      alignSelf: 'center',
      marginTop: 15,
      padding: 5,
      elevation: 0,
    },
    appleButtonContainer: {
      width: '70%',
      height: 40,
      marginTop: 16,
      alignSelf: 'center',
    },
    facebookText: {
      color: '#ffffff',
      fontSize: 14,
    },
    signWithEmailContainer: {
      marginTop: 20,
    },
    tos: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
    },
    backArrowStyle: {
      resizeMode: 'contain',
      tintColor: colorSet.primaryForeground,
      width: 25,
      height: 25,
      marginTop: Platform.OS === 'ios' ? 50 : 20,
      marginLeft: 10,
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    },
  })
}

export default dynamicStyles
