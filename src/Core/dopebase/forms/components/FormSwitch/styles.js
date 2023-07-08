import { I18nManager, StyleSheet, Platform } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    container: {
      marginLeft: 30,
      marginTop: 24,
      ...Platform.select({
        web: {
          flexDirection: 'row',
          alignItems: 'center',
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
          alignSelf: 'stretch',
        },
        default: {
          marginBottom: 8,
          alignSelf: 'stretch',
          textAlign: 'left',
        },
      }),
      color: colorSet.secondaryText,
      fontSize: 16,
      fontWeight: '500',
    },
  })
}

export default dynamicStyles
