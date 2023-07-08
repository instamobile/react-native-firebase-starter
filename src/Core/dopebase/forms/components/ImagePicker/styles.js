import { StyleSheet, Platform } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  return StyleSheet.create({
    container: {
      marginLeft: 30,
      ...Platform.select({
        web: {
          flexDirection: 'row',
          alignItems: 'center',
        },
      }),
      marginTop: 24,
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
          fontSize: 20,
          alignSelf: 'stretch',
          textAlign: 'left',
        },
      }),
      marginBottom: 8,
      color: colorSet.secondaryText,
      fontSize: 16,
      fontWeight: '500',
    },
    uploadImageBtnContainer: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    uploadImageBtn: {
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colorSet.secondaryText,
      ...Platform.select({
        web: {
          marginLeft: 20,
        },
      }),
    },
    uploadImageText: {
      textAlign: 'center',
      fontSize: 18,
      color: colorSet.secondaryText,
    },
    image: {
      width: 64,
      height: 64,
      borderRadius: 10,
    },
  })
}

export default dynamicStyles
