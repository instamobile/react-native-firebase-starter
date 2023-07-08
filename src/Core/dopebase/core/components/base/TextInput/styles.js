import { I18nManager, StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    textInput: {
      color: theme.colors[appearance].primaryText,
      backgroundColor: theme.colors[appearance].primaryBackground,
      height: 42,
      borderColor: theme.colors[appearance].grey3,
      borderWidth: 1,
      paddingLeft: 20,
      width: '100%',
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      alignSelf: 'center',
      alignItems: 'center',
    },
  })
}

export default styles
