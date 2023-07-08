import { I18nManager, StyleSheet, Platform, Dimensions } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  const windowWidth = Dimensions.get('window').width
  return StyleSheet.create({
    container: {
      marginLeft: 30,
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
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'right',
          marginTop: 25,
          marginBottom: 20,
          alignSelf: 'stretch',
        },
        default: {
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 25,
          marginBottom: 20,
          alignSelf: 'stretch',
          textAlign: 'left',
        },
      }),
      color: colorSet.grey9,
    },
    dateContainer: {
      width: Platform.OS === 'web' ? windowWidth * 0.2 : '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dateTextContainer: {
      ...Platform.select({
        web: {
          width: windowWidth * 0.09,
        },
        default: { width: windowWidth * 0.4 },
      }),
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colorSet.grey9,
    },
    date: {
      textAlign: 'center',
      fontSize: 18,
      color: colorSet.secondaryText,
    },
    modalView: {
      flex: 1,
    },
    headerBar: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      color: colorSet.primaryForeground,
      padding: 10,
    },
    calenderTitle: {
      color: 'black',
      flex: 1,
      // fontFamily: AppStyles.fontSet.bold,
      fontSize: 20,
      textAlign: 'center',
      alignSelf: 'center',
    },
  })
}

export default dynamicStyles
