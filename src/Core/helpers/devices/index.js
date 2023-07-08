import { Platform, Dimensions } from 'react-native'

const device = Dimensions.get('window')

let iosScale

switch (device.width) {
  // iPhone 4, 4S, 5, 5S
  case 320:
    iosScale = 0.77
    break
  // iPhone 6, 6S
  case 375:
    iosScale = 0.902
    break
  // iPhone 6 plus, 6S plus
  case 414:
    iosScale = 1
    break
  default:
    iosScale = 1
}

export const scale = iosScale
export const size = pixel => Math.ceil(pixel * iosScale)

//

let androidScale

if (device.width <= 414) {
  // Android smartphones
  androidScale = device.width / 414
} else {
  // Android tablets
  androidScale = 1
}

export default Platform.select({
  android: {
    scale: androidScale,
    size: pixel => {
      return Math.ceil(pixel * androidScale)
    },
  },
  ios: {
    scale: iosScale,
    size: pixel => Math.ceil(pixel * iosScale),
  },
  web: {
    scale: iosScale,
    size: pixel => Math.ceil(pixel * iosScale),
  },
})
