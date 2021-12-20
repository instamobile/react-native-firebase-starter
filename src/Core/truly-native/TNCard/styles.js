import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]

  return StyleSheet.create({
    tnCardContainer: {
      flex: 1,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colorSet.primaryBackground,
      paddingBottom: 15,
      paddingTop: 15,
      paddingLeft: 15,
      paddingRight: 15,
    },
    tnCardShadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  })
}

export default styles
