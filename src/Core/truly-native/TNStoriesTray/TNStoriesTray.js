import React, { memo, useCallback } from 'react'
import { FlatList, I18nManager } from 'react-native'
import { useTheme } from 'dopenative'
import TNStoryItem from './TNStoryItem/TNStoryItem'
import dynamicStyles from './styles'

function TNStoriesTray(props) {
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
      <TNStoryItem
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
          <TNStoryItem
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

export default memo(TNStoriesTray)
