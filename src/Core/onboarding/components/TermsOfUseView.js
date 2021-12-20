import React from 'react'
import { Text, Linking, View } from 'react-native'
import { useTheme, useTranslations } from 'dopenative'

const TermsOfUseView = props => {
  const { tosLink, privacyPolicyLink, style } = props
  const { theme, appearance } = useTheme()
  const { localized } = useTranslations()

  return (
    <View style={style}>
      <Text
        style={{ fontSize: 12, color: theme.colors[appearance].primaryText }}>
        {localized('By creating an account you agree with our')}
      </Text>
      <Text>
        <Text
          style={{ color: 'blue', fontSize: 12 }}
          onPress={() => Linking.openURL(tosLink)}>
          {localized('Terms of Use')}
        </Text>
        {privacyPolicyLink?.length > 0 && (
          <Text style={{ fontSize: 12 }}>
            {localized(' and ')}
            <Text
              style={{ color: 'blue', fontSize: 12 }}
              onPress={() => Linking.openURL(privacyPolicyLink)}>
              {localized('Privacy Policy')}
            </Text>
          </Text>
        )}
      </Text>
    </View>
  )
}

export default TermsOfUseView
