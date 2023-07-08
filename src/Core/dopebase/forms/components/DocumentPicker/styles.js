import { StyleSheet, Platform, Dimensions } from 'react-native'

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
    uploadDocumentBtnContainer: {
      width: Platform.OS === 'web' ? windowWidth * 0.15 : '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    uploadDocumentBtn: {
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colorSet.grey9,
    },
    uploadDocumentText: {
      textAlign: 'center',
      fontSize: 18,
      color: colorSet.secondaryText,
    },
  })
}

export default dynamicStyles
