import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    tnDialogContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      borderRadius: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.67)',
      zIndex: 999,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tnDialogTitle: {
      fontSize: theme.fontSizes.xl,
      color: theme.colors[appearance].primaryText,
      fontWeight: '600',
      marginBottom: 0,
    },
    tnDialogMessage: {
      fontSize: theme.fontSizes.m,
      color: theme.colors[appearance].secondaryText,
      textAlign: 'center',
      marginTop: theme.spaces.vertical.l,
      marginBottom: theme.spaces.vertical.xl,
    },
    tnDialogInnerContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.colors[appearance].primaryBackground,
      paddingHorizontal: theme.spaces.horizontal.xl,
      paddingVertical: theme.spaces.vertical.l,
      marginHorizontal: theme.spaces.horizontal.l,
      borderColor: theme.colors[appearance].grey0,
      borderWidth: 0.5,
      borderRadius: 16,
    },
    tnDialogShadow: {
      shadowColor: theme.colors[appearance].grey0,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    tnActionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignSelf: 'stretch',
    },
    tnDestructiveButton: {
      borderColor: theme.colors[appearance].red,
    },
    tnDestructiveButtonText: {
      color: theme.colors[appearance].red,
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
