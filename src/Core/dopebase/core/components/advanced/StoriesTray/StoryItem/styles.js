import { StyleSheet } from 'react-native'

const imageContainerWidth = 66
const imageWidth = imageContainerWidth - 6

const dynamicStyles = (theme, appearance) => {
  const colorSet = theme.colors[appearance]
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      margin: 8,
      overflow: 'hidden',
    },
    imageContainer: {
      width: imageContainerWidth,
      height: imageContainerWidth,
      borderRadius: Math.floor(imageContainerWidth / 2),
      borderColor: colorSet.primaryForeground,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: imageWidth,
      height: imageWidth,
      borderRadius: Math.floor(imageWidth / 2),
      borderColor: colorSet.primaryBackground,
      borderWidth: 1,
      overflow: 'hidden',
    },
    text: {
      fontSize: 12,
      textAlign: 'center',
      color: colorSet.secondaryText,
      paddingTop: 5,
    },
    isOnlineIndicator: {
      position: 'absolute',
      backgroundColor: '#4acd1d',
      height: 16,
      width: 16,
      borderRadius: 16 / 2,
      borderWidth: 3,
      borderColor: colorSet.primaryBackground,
      right: 5,
      bottom: 0,
    },
    verifiedIcon: {
      width: 18,
      height: 18,
      marginLeft: 3,
    },
    verifiedContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
}

export default dynamicStyles
