import { StyleSheet, Dimensions } from 'react-native'
import { ifIphoneX } from 'react-native-iphone-x-helper'

const { width, height } = Dimensions.get('window')
const closeButtonSize = Math.floor(height * 0.032)

const styles = StyleSheet.create({
  container: {
    width,
    height,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deck: {
    width,
    backgroundColor: '#333333',
  },

  progressIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },

  indicatorWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  indicators: {
    height: 30,
    ...ifIphoneX(
      {
        marginTop: 20,
      },
      {
        marginTop: 2,
      },
    ),
    alignItems: 'center',
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  indicatorBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 50,
  },

  back: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 110,
  },
  next: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 160,
  },
  closeButton: {
    position: 'absolute',
    ...ifIphoneX(
      {
        top: 45,
      },
      {
        top: 25,
      },
    ),
    right: 10,
    height: closeButtonSize,
    width: closeButtonSize,
    borderRadius: Math.floor(closeButtonSize / 2),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4c5c4',
    opacity: 0.7,
    zIndex: 2,
  },
  closeCross: {
    width: '68%',
    height: 1,
    backgroundColor: 'black',
  },
})

export default styles
