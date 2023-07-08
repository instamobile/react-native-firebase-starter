import React from 'react'
import { useColorScheme } from 'react-native'
import DNDefaultTheme from './default'

export default DNDefaultTheme

export const DopebaseContext = React.createContext()

const defaultProps = {
  children: null,
  theme: {},
}

export function DopebaseProvider(props = defaultProps) {
  const { theme, children } = props
  const colorScheme = useColorScheme()
  const overridenTheme = { ...DNDefaultTheme, ...theme }
  const context = {
    theme: overridenTheme,
    appearance: colorScheme,
  }
  return (
    <DopebaseContext.Provider value={context}>
      {children}
    </DopebaseContext.Provider>
  )
}

export function useDopebase(Component, styles) {
  return props => {
    const colorScheme = useColorScheme()
    return (
      <DopebaseContext.Consumer>
        {context => (
          <Component
            {...props}
            theme={{ ...DNDefaultTheme, ...context.theme }}
            appearance={colorScheme || context.appearance}
            styles={
              styles &&
              styles(
                { ...DNDefaultTheme, ...context.theme },
                context.appearance,
              )
            }
          />
        )}
      </DopebaseContext.Consumer>
    )
  }
}

export function extendTheme(theme) {
  return { ...DNDefaultTheme, ...theme }
}

export function useTheme() {
  return React.useContext(DopebaseContext)
}
