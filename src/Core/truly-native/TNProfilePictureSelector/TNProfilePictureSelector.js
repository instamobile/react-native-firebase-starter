import React, { useState, useRef } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Platform,
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import ImageView from 'react-native-image-view'
import * as ImagePicker from 'expo-image-picker'
import FastImage from 'react-native-fast-image'
import { useTheme, useTranslations } from 'dopenative'
import dynamicStyles from './styles'

const Image = FastImage

const TNProfilePictureSelector = props => {
  const [profilePictureURL, setProfilePictureURL] = useState(
    props.profilePictureURL || '',
  )
  const originalProfilePictureURL = useRef(props.profilePictureURL || '')
  if (originalProfilePictureURL.current !== (props.profilePictureURL || '')) {
    originalProfilePictureURL.current = props.profilePictureURL || ''
    setProfilePictureURL(props.profilePictureURL || '')
  }

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false)
  const [tappedImage, setTappedImage] = useState([])
  const actionSheet = useRef(null)
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const handleProfilePictureClick = url => {
    if (url) {
      const isAvatar = url.search('avatar')
      const image = [
        {
          source: {
            uri: url,
          },
        },
      ]
      if (isAvatar === -1) {
        setTappedImage(image)
        setIsImageViewerVisible(true)
      } else {
        showActionSheet()
      }
    } else {
      showActionSheet()
    }
  }

  const onImageError = () => {
    console.log('Error loading profile photo at url ' + profilePictureURL)
    const defaultProfilePhotoURL =
      'https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg'
    setProfilePictureURL(defaultProfilePhotoURL)
  }

  const getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync(false)

      if (permissionResult.granted === false) {
        alert(
          localized(
            'Sorry, we need camera roll permissions to make this work.',
          ),
        )
      }
    }
  }

  const onPressAddPhotoBtn = async () => {
    const options = {
      title: localized('Select photo'),
      cancelButtonTitle: localized('Cancel'),
      takePhotoButtonTitle: localized('Take Photo'),
      chooseFromLibraryButtonTitle: localized('Choose from Library'),
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }

    await getPermissionAsync()

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      setProfilePictureURL(result.uri)
      props.setProfilePictureFile(result)
    }
  }

  const closeButton = () => (
    <TouchableOpacity
      style={styles.closeButton}
      onPress={() => setIsImageViewerVisible(false)}>
      <Image style={styles.closeIcon} source={theme.icons.close} />
    </TouchableOpacity>
  )

  const showActionSheet = index => {
    setSelectedPhotoIndex(index)
    actionSheet.current.show()
  }

  const onActionDone = index => {
    if (index == 0) {
      onPressAddPhotoBtn()
    }
    if (index == 2) {
      // Remove button
      if (profilePictureURL) {
        setProfilePictureURL(null)
        props.setProfilePictureFile(null)
      }
    }
  }

  return (
    <>
      <View style={styles.imageBlock}>
        <TouchableHighlight
          style={styles.imageContainer}
          onPress={() => handleProfilePictureClick(profilePictureURL)}>
          <Image
            style={[styles.image, { opacity: profilePictureURL ? 1 : 0.3 }]}
            source={
              profilePictureURL
                ? { uri: profilePictureURL }
                : theme.icons.userAvatar
            }
            resizeMode="cover"
            onError={onImageError}
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={showActionSheet} style={styles.addButton}>
          <Image style={styles.cameraIcon} source={theme.icons.cameraFilled} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ActionSheet
          ref={actionSheet}
          title={localized('Confirm action')}
          options={[
            localized('Change Profile Photo'),
            localized('Cancel'),
            localized('Remove Profile Photo'),
          ]}
          cancelButtonIndex={1}
          destructiveButtonIndex={2}
          onPress={index => {
            onActionDone(index)
          }}
        />
        <ImageView
          images={tappedImage}
          isVisible={isImageViewerVisible}
          onClose={() => setIsImageViewerVisible(false)}
          controls={{ close: closeButton }}
        />
      </ScrollView>
    </>
  )
}

export default TNProfilePictureSelector
