import { Platform } from 'react-native'

const HORIZONTAL_SPACING_BASE = Platform.OS === 'web' ? 4 : 2
const VERTICAL_SPACING_BASE = 4

const icons = {
  logo: require('../assets/icons/rocket-icon.png'),
  firebase: require('../assets/icons/firebase-icon.png'),
  userAvatar: require('../assets/icons/default-avatar.jpg'),
  backArrow: require('../assets/icons/arrow-back-icon.png'),
  home_android: require('../assets/icons/home-icon-24.png'),
  search: require('../assets/icons/search.png'),
  camera: require('../assets/icons/camera.png'),
  cameraFilled: require('../assets/icons/camera-filled.png'),
  inscription: require('../assets/icons/inscription.png'),
  pinpoint: require('../assets/icons/pinpoint.png'),
  checked: require('../assets/icons/checked.png'),
  bell: require('../assets/icons/bell.png'),
  logout: require('../assets/icons/logout-drawer.png'),
  users_android: require('../assets/icons/users-icon-48.png'),
  user_android: require('../assets/icons/account-detail.png'),
}

const lightColors = {
  primaryBackground: '#ffffff',
  secondaryBackground: '#ffffff',
  primaryForeground: '#6546d7',
  secondaryForeground: '#8442bd',
  foregroundContrast: 'white',
  primaryText: '#151723',
  secondaryText: '#7e7e7e',
  hairline: '#e0e0e0',
  grey0: '#fafafa',
  grey3: '#f5f5f5',
  grey6: '#d6d6d6',
  grey9: '#939393',
  red: '#ea0606',
}

const InstamobileTheme = {
  colors: {
    light: lightColors,
    'no-preference': lightColors,
    dark: {
      primaryBackground: '#121212',
      secondaryBackground: '#000000',
      primaryForeground: '#6546d7',
      secondaryForeground: '#8442bd',
      foregroundContrast: 'white',
      primaryText: '#ffffff',
      secondaryText: '#c5c5c5',
      hairline: '#222222',
      grey0: '#0a0a0a',
      grey3: '#2a2a2a',
      grey6: '#f5f5f5',
      grey9: '#eaeaea',
      red: '#ea0606',
    },
  },
  spaces: {
    horizontal: {
      s: 2 * HORIZONTAL_SPACING_BASE,
      m: 4 * HORIZONTAL_SPACING_BASE,
      l: 6 * HORIZONTAL_SPACING_BASE,
      xl: 8 * HORIZONTAL_SPACING_BASE,
    },
    vertical: {
      s: 2 * VERTICAL_SPACING_BASE,
      m: 4 * VERTICAL_SPACING_BASE,
      l: 6 * VERTICAL_SPACING_BASE,
      xl: 8 * VERTICAL_SPACING_BASE,
    },
  },
  fontSizes: {
    xxs: 8,
    xs: 12,
    s: 14,
    m: 16,
    l: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeights: {
    s: '400',
    m: '600',
    l: '800',
  },
  icons: icons,
  // color, font size, space / margin / padding, vstack / hstack
  button: {
    borderRadius: 8,
  },
}

export default InstamobileTheme
