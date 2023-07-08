import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    tnPrimaryText: {
      color: theme.colors[appearance].primaryText,
    },
    tnSecondaryText: {
      color: theme.colors[appearance].secondaryText,
    },
  })
}

export default styles
