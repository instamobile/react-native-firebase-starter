import { StyleSheet, Platform, Dimensions } from 'react-native'

const dynamicStyles = (theme, colorScheme) => {
  const colorSet = theme.colors[colorScheme]
  const windowWidth = Dimensions.get('window').width
  return StyleSheet.create({
    container: {
      zIndex: 99,
      marginLeft: 30,
      marginTop: 25,
      ...Platform.select({
        web: {
          flexDirection: 'row',
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
          marginBottom: 20,
          textAlign: 'left',
        },
      }),
      marginTop: 24,
      fontSize: 16,
      color: colorSet.secondaryText,
      fontWeight: '500',
    },
    selectedItemContainer: {
      ...Platform.select({
        web: {
          width: windowWidth * 0.2,
          borderRadius: 10,
          color: colorSet.secondaryText,
        },
        default: {
          width: '90%',
          borderRadius: 25,
          color: colorSet.primaryText,
        },
      }),
      borderWidth: 1,
      backgroundColor: colorSet.primaryBackground,
      justifyContent: 'center',
      height: 42,
      borderColor: colorSet.grey9,
      paddingLeft: 20,
    },
    listContainer: {
      width: '100%',
      zIndex: 9999,
    },

    dropdown: {
      ...Platform.select({
        web: {
          borderWidth: 1,
          borderColor: colorSet.grey9,
          width: windowWidth * 0.2,
          borderRadius: 10,
        },
        default: {
          width: '85%',
          borderRadius: 25,
        },
      }),
      backgroundColor: colorSet.primaryBackground,
      height: 180,
      overflow: 'hidden',
    },
    overlay: {
      width: '100%',
      height: '100%',
    },

    shadowContainer: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: colorSet.grey3,
    },
    itemText: {
      color: Platform.OS === 'web' ? colorSet.secondaryText : colorSet.grey9,
      fontSize: 18,
    },
    checkbox: {
      margin: 8,
    },
  })
}

export default dynamicStyles
