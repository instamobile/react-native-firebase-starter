import React from 'react'
import { View, Text, Image } from 'react-native'
import { useDispatch } from 'react-redux'
import { useTheme, useTranslations } from 'dopenative'
import dynamicStyles from './styles'
import { logout } from '../../../onboarding/redux/auth'
import IMMenuButton from '../IMMenuButton/IMMenuButton'
import { useAuth } from '../../../onboarding/hooks/useAuth'
import { useCurrentUser } from '../../../onboarding'

const IMDrawerMenu = props => {
  const { navigation, menuItems, menuItemsSettings } = props

  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const authManager = useAuth()
  const currentUser = useCurrentUser()
  const dispatch = useDispatch()

  const defaultProfilePhotoURL =
    'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'

  const actionLowerMenu = action => {
    if (action == 'logout') {
      authManager?.logout(currentUser)
      dispatch(logout())
      navigation.navigate('LoadScreen')
      return
    }
    return
  }

  const mappingMenuItems = menuItems.map((menuItem, index) => (
    <IMMenuButton
      title={menuItem.title}
      source={menuItem.icon}
      containerStyle={props.menuItemStyle}
      key={index}
      onPress={() => {
        navigation.navigate(menuItem.navigationPath)
      }}
    />
  ))

  const mappingMenuSettings = menuItemsSettings.map(
    (menuItemsSetting, index) => (
      <IMMenuButton
        key={index}
        title={menuItemsSetting.title}
        source={menuItemsSetting.icon}
        containerStyle={props.menuItemStyle}
        onPress={() => {
          actionLowerMenu(menuItemsSetting.action)
        }}
      />
    ),
  )

  const lowerMenu =
    menuItemsSettings.length == 0 ? null : (
      <View>
        <View style={styles.line} />
        {mappingMenuSettings}
      </View>
    )
  return (
    <View style={styles.content}>
      <View style={[styles.header, props.headerStyle]}>
        <Image
          style={styles.imageContainer}
          source={{
            uri:
              currentUser.photoURI ||
              currentUser.profilePictureURL ||
              defaultProfilePhotoURL,
          }}
        />
        <Text style={[styles.info, props.nameStyle]}>
          {currentUser.firstName} {currentUser.lastName}
        </Text>
        <Text style={[styles.email, props.emailStyle]}>
          {currentUser.email}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={[styles.container, props.forceMenuItemsStyle]}>
          {mappingMenuItems}
          {lowerMenu}
        </View>
        <View style={styles.footer}>
          <Text style={styles.textFooter}>
            {localized('Made by Instamobile')}
          </Text>
        </View>
      </View>
    </View>
  )
}
export default IMDrawerMenu
