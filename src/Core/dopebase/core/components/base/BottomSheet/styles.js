import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    bottomSheet: {
      backgroundColor: 'red',
      borderTopRightRadius: 24,
      borderTopLeftRadius: 24,
    },
    background: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    bottomSheetContainer: {
      backgroundColor: theme.colors[appearance].primaryBackground,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.colors[appearance].primaryBackground,
      justifyContent: 'center',
      padding: 15,
      paddingTop: 10,
    },
  })
}

export default styles
