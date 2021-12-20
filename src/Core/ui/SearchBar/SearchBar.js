import React from 'react'
import { View } from 'react-native'
import SearchBox from 'react-native-search-bar'
import { useTheme, useTranslations } from 'dopenative'
import dynamicStyles from './styles'

export default function SearchBar(props) {
  const {
    onChangeText,
    onSearchBarCancel,
    onSearch,
    searchRef,
    placeholder,
    searchContainerStyle,
  } = props
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const onSearchTextChange = text => {
    onChangeText(text)
  }

  const onCancel = () => {
    onSearchTextChange('')
    onSearchBarCancel()
  }

  const onSearchClear = () => {
    onSearchTextChange('')
  }

  return (
    <View style={[styles.container, searchContainerStyle]}>
      <SearchBox
        ref={searchRef}
        placeholder={placeholder || localized('Search for friends')}
        onChangeText={onSearchTextChange}
        onSearchButtonPress={onSearch}
        showsCancelButton={true}
        searchBarStyle="minimal"
        cancelButtonText={localized('Cancel')}
        style={styles.searchInput}
        showsCancelButtonWhileEditing={true}
        onCancelButtonPress={onCancel}
        onSearchClear={onSearchClear}
        tintColor={theme.colors[appearance].primaryForeground}
        textColor={theme.colors[appearance].primaryText}
      />
    </View>
  )
}
