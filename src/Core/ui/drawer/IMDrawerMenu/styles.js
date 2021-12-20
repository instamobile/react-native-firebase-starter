import { StyleSheet, Platform } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    content: {
      flex: 1,
      backgroundColor: colorSet.grey0,
    },
    header: {
      height: Platform.OS === 'ios' ? '23%' : '29%',
      marginTop: Platform.OS === 'ios' ? 50 : 0,
      backgroundColor: Platform.OS === 'ios' ? colorSet.grey0 : '#3066d1',
      justifyContent: 'center',
    },

    info: {
      color: Platform.OS === 'ios' ? colorSet.primaryText : 'white',
      display: 'flex',
      fontWeight: 'bold',
      marginLeft: '10%',
      paddingTop: 7,
    },
    email: {
      color: Platform.OS === 'ios' ? colorSet.primaryText : 'white',
      display: 'flex',
      fontWeight: 'normal',
      marginTop: 5,
      marginLeft: '10%',
    },
    imageContainer: {
      height: 80,
      width: 80,
      borderRadius: 50,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      marginLeft: '8%',
      shadowOpacity: 0.1,
      overflow: 'hidden',
      // ...Platform.select({
      //   ios: {
      //     marginTop: '20%',
      //     marginBottom: '5%',
      //   },
      //   android: {
      //     marginTop: '10%',
      //     marginBottom: '5%',
      //   },
      // }),
    },
    container: {
      marginTop: '5%',
      marginLeft: '5%',
    },
    line: {
      borderBottomColor: colorSet.grey9,
      borderBottomWidth: 0.4,
      width: '95%',
      marginBottom: 10,
    },
    footer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 24,
    },
    textFooter: {
      color: colorSet.grey9,
      fontWeight: 'normal',
    },
  })
}

export default dynamicStyles
