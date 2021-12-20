import React, { memo } from 'react'
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
  Dimensions,
} from 'react-native'
import { useTheme } from 'dopenative'
import { Button } from 'react-native-elements'
import dynamicStyles from './styles'

export default memo(function SearchBarAlternate(props) {
  const { onPress, placeholderTitle, onChangeText, onSearchBarCancel, value } =
    props

  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const searchIcon = require('../../../assets/icons/search.png')

  if (onChangeText) {
    return (
      <View style={styles.searchBoxContainer}>
        <View
          style={[
            styles.container,
            { width: Dimensions.get('window').width - 86, borderRadius: 9 },
          ]}>
          <Image style={styles.searchIcon} source={searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder={placeholderTitle}
            onChangeText={onChangeText}
            defaultValue={value}
          />
        </View>
        <Button onPress={onSearchBarCancel} title="Cancel" type="clear" />
      </View>
    )
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}>
      <Image style={styles.searchIcon} source={searchIcon} />
      <Text style={styles.searchInput}>{placeholderTitle}</Text>
    </TouchableOpacity>
  )
})
