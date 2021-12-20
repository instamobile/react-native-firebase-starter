import AsyncStorage from '@react-native-community/async-storage'

const SHOULD_SHOW_ONBOARDING_FLOW = 'SHOULD_SHOW_ONBOARDING_FLOW'

/**
 * Get Should Show Onboarding
 * @param {String} value
 * @returns {Boolean}
 */
const getShouldShowOnboardingFlow = async () => {
  try {
    const result = await AsyncStorage.getItem(SHOULD_SHOW_ONBOARDING_FLOW)

    return result !== null ? false : true
  } catch (err) {
    console.log(err)
  }
}

/**
 * Get Should Show OnBoarding Flow
 * @param {String} value
 *
 */
const setShouldShowOnboardingFlow = async value => {
  try {
    await AsyncStorage.setItem(SHOULD_SHOW_ONBOARDING_FLOW, value)
  } catch (err) {
    console.log(err)
  }
}

const authDeviceStorage = {
  getShouldShowOnboardingFlow,
  setShouldShowOnboardingFlow,
}

export default authDeviceStorage
