import { I18nManager, StyleSheet, Platform, Dimensions } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  const windowWidth = Dimensions.get('window').width
  return StyleSheet.create({
    container: {
      marginLeft: 32,
      ...Platform.select({
        web: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 32,
        },
        default: {
          marginTop: 24,
        },
      }),
    },
    titleContainer: {
      ...Platform.select({
        web: {
          width: '10%',
          marginRight: 20,
        },
      }),
    },
    title: {
      ...Platform.select({
        web: {
          textAlign: 'right',
        },
        default: {
          marginBottom: 8,
          textAlign: 'left',
        },
      }),
      fontSize: 16,
      color: colorSet.secondaryText,
      fontWeight: '500',
    },
    inputContainer: {
      ...Platform.select({
        web: {
          width: windowWidth * 0.2,
          borderRadius: 8,
          color: colorSet.secondaryText,
        },
        default: {
          width: '90%',
          alignItems: 'center',
          borderRadius: 8,
          textAlign: I18nManager.isRTL ? 'right' : 'left',
          color: colorSet.primaryText,
        },
      }),
      fontSize: 16,
      backgroundColor: colorSet.primaryBackground,
      borderWidth: 1,
      height: 50,
      borderColor: colorSet.grey6,
      paddingLeft: 20,
    },
  })
}

export default dynamicStyles
