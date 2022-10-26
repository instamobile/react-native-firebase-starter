import { Platform, StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginVertical: 4,
      flexDirection: 'row',
      height: 40,
      backgroundColor: colorSet.primaryBackground,
    },
    cancelButtonText: {
      color: colorSet.primaryForeground,
      fontSize: 16,
      marginBottom: 5,
    },
    searchInput: {
      fontSize: 14,
      color: colorSet.primaryText,
      backgroundColor:
        Platform.OS === 'ios' ? colorSet.primaryBackground : colorSet.grey0,
      flex: 1,
    },
  })
}

export default dynamicStyles
