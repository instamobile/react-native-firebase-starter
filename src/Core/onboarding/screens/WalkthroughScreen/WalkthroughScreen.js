import React, { useLayoutEffect } from 'react'
import { View, Image, Text } from 'react-native'
import PropTypes from 'prop-types'
import AppIntroSlider from 'react-native-app-intro-slider'
import { useTheme, useTranslations } from 'dopenative'
import deviceStorage from '../../utils/AuthDeviceStorage'
import dynamicStyles from './styles'
import { useOnboardingConfig } from '../../hooks/useOnboardingConfig'

const WalkthroughScreen = props => {
  const { navigation } = props
  const { config } = useOnboardingConfig()

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const slides = config.onboardingConfig.walkthroughScreens.map(
    (screenSpec, index) => {
      return {
        key: index,
        text: screenSpec.description,
        title: screenSpec.title,
        image: screenSpec.icon,
      }
    },
  )

  const _onDone = () => {
    deviceStorage.setShouldShowOnboardingFlow('false')
    if (config?.isDelayedLoginEnabled) {
      navigation.navigate('DelayedHome')
      return
    }
    navigation.navigate('LoginStack', { screen: 'Welcome' })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [navigation])

  const _renderItem = ({ item, dimensions }) => (
    <View style={[styles.container, dimensions]}>
      <Image
        style={styles.image}
        source={item.image}
        size={100}
        color="white"
      />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
      </View>
    </View>
  )

  const _renderNextButton = () => {
    return <Text style={styles.button}>{localized('Next')}</Text>
  }

  const _renderSkipButton = () => {
    return <Text style={styles.button}>{localized('Skip')}</Text>
  }

  const _renderDoneButton = () => {
    return <Text style={styles.button}>{localized('Done')}</Text>
  }

  return (
    <AppIntroSlider
      data={slides}
      slides={slides}
      onDone={_onDone}
      renderItem={_renderItem}
      //Handler for the done On last slide
      showSkipButton={true}
      onSkip={_onDone}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      renderDoneButton={_renderDoneButton}
    />
  )
}

export default WalkthroughScreen
