import React, { useCallback } from 'react'
import { FlatList, I18nManager } from 'react-native'
import { useTheme } from '../../..'
import { StoryItem } from './StoryItem/StoryItem'
import dynamicStyles from './styles'

export function StoriesTray(props) {
  const {
    data,
    onListEndReached,
    onStoryItemPress,
    onUserItemPress,
    user,
    displayUserItem,
    userItemShouldOpenCamera,
    storyItemContainerStyle,
    userStoryTitle,
    displayLastName,
    showOnlineIndicator,
    displayVerifiedBadge,
  } = props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const renderItem = ({ item, index }) => {
    const isSeen =
      item?.items && item?.idx + 1 === item.items?.length && styles.seenStyle

    return (
      <StoryItem
        onPress={onStoryItemPress}
        item={{ ...item, lastName: displayLastName ? item.lastName : ' ' }}
        index={index}
        title={true}
        showOnlineIndicator={showOnlineIndicator && item?.isOnline}
        imageContainerStyle={
          storyItemContainerStyle ? storyItemContainerStyle : isSeen
        }
        displayVerifiedBadge={displayVerifiedBadge}
      />
    )
  }

  const onPress = useCallback(
    (item, index, refIndex) => {
      onUserItemPress(userItemShouldOpenCamera, refIndex, index)
    },
    [onUserItemPress, userItemShouldOpenCamera],
  )

  return (
    <FlatList
      ListHeaderComponent={
        displayUserItem ? (
          <StoryItem
            onPress={onPress}
            title={true}
            displayVerifiedBadge={displayVerifiedBadge}
            index={0}
            item={{ ...user, firstName: userStoryTitle, lastName: '' }}
          />
        ) : null
      }
      style={styles.storiesContainer}
      data={data}
      inverted={I18nManager.isRTL}
      renderItem={renderItem}
      keyExtractor={(item, index) => index + 'item'}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      onEndReached={onListEndReached}
      onEndReachedThreshold={0.3}
    />
  )
}
