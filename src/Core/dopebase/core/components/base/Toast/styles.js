import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    tnToastContainer: {
      position: 'absolute',
      left: 20,
      right: 20,
      bottom: 50,
      height: 60,
      borderRadius: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.67)',
      paddingBottom: 15,
      paddingTop: 15,
      paddingLeft: 15,
      paddingRight: 15,
      zIndex: 999,
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    tnToastImage: {},
    tnToastContent: {
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.9)',
    },
    tnToastInnerContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    tnToastPrimaryAction: {
      fontWeight: 'bold',
      fontSize: 16,
      color: 'rgba(255, 255, 255, 0.8)',
    },
    tnToastSecondaryAction: {
      alignSelf: 'flex-end',
    },
    tnToastShadow: {
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
