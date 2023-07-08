import { Dimensions } from 'react-native'

const device = Dimensions.get('window')
let calculatedScale

switch (device.width) {
  // iPhone 4, 4S, 5, 5S
  case 320:
    calculatedScale = 0.77
    break
  // iPhone 6, 6S
  case 375:
    calculatedScale = 0.902
    break
  // iPhone 6 plus, 6S plus
  case 414:
    calculatedScale = 1
    break
  default:
    calculatedScale = 1
}

export const scale = calculatedScale
export const size = pixel => Math.ceil(pixel * calculatedScale)
