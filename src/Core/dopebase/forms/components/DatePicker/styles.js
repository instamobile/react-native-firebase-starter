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
      zIndex: 100,
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
          alignSelf: 'stretch',
          textAlign: 'left',
        },
      }),
      marginBottom: 8,
      fontSize: 16,
      fontWeight: '500',
      color: colorSet.secondaryText,
    },
    dateContainer: {
      ...Platform.select({
        web: {},
        default: {
          width: '36%',
        },
      }),
    },
    date: {
      fontSize: 16,
      color: colorSet.secondaryText,
      ...Platform.select({
        web: {
          backgroundColor: colorSet.grey3,
          borderRadius: 8,
        },
      }),
      padding: 10,
    },
    dateTextContainer: {},
  })
}

export default dynamicStyles
