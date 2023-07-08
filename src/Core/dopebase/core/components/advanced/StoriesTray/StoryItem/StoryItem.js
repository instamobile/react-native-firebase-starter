import React, { useRef, memo } from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'
import { useTheme } from '../../../..'
import dynamicStyles from './styles'

const defaultAvatar =
  'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

export const StoryItem = memo(props => {
  const {
    item,
    index,
    onPress,
    containerStyle,
    imageStyle,
    imageContainerStyle,
    textStyle,
    activeOpacity,
    title,
    showOnlineIndicator,
    displayVerifiedBadge,
  } = props

  const refs = useRef()

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const lastName = item.lastName || ''
  return (
    <TouchableOpacity
      key={index}
      ref={refs}
      activeOpacity={activeOpacity}
      onPress={() => onPress(item, index, refs)}
      style={[styles.container, containerStyle]}>
      <View style={[styles.imageContainer, imageContainerStyle]}>
        <Image
          style={[styles.image, imageStyle]}
          source={{ uri: item.profilePictureURL || defaultAvatar }}
        />
        {showOnlineIndicator && <View style={styles.isOnlineIndicator} />}
      </View>
      {title && (
        <View style={styles.verifiedContainer}>
          <Text
            style={[
              styles.text,
              textStyle,
            ]}>{`${item.firstName} ${lastName}`}</Text>
          {displayVerifiedBadge &&
            item.isVerified &&
            (item.username !== 'My Story' || item.username !== 'Add Story') && (
              <Image
                style={styles.verifiedIcon}
                source={require('./verified.png')}
              />
            )}
        </View>
      )}
    </TouchableOpacity>
  )
})
