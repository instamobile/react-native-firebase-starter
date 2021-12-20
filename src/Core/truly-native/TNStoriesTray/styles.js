import { StyleSheet } from 'react-native'

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  return StyleSheet.create({
    storiesContainer: {
      backgroundColor: colorSet.primaryBackground,
      marginBottom: 5,
      flexDirection: 'row',
    },
    seenStyle: {
      borderColor: colorSet.grey6,
      borderWidth: 1,
    },
  })
}

export default dynamicStyles
