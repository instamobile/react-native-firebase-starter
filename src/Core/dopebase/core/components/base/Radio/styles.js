import { StyleSheet } from 'react-native'

const styles = (theme, appearance) => {
  return StyleSheet.create({
    outerContainer: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderColor: theme.colors[appearance].primaryForeground,
      borderWidth: 2,
      padding: 4,
    },
    innerContainerSelected: {
      backgroundColor: theme.colors[appearance].primaryForeground,
      borderRadius: 12,
    },
    innerContainerUnselected: {
      backgroundColor: theme.colors[appearance].primaryBackground,
      borderRadius: 12,
    },
  })
}

export default styles
