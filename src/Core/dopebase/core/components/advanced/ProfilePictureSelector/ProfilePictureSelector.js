import React, { useState, useRef, useMemo } from 'react'
import {
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Platform,
  Image,
} from 'react-native'
import ImageView from 'react-native-image-view'
import * as ImagePicker from 'expo-image-picker'
import { useActionSheet, useTheme, useTranslations } from '../../..'
import dynamicStyles from './styles'

export const ProfilePictureSelector = props => {
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
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)

  const { showActionSheetWithOptions } = useActionSheet()

  const actionSheetOptions = useMemo(() => {
    return {
      title: localized('Confirm action'),
      options: [
        localized('Change Profile Photo'),
        localized('Cancel'),
        localized('Remove Profile Photo'),
      ],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 2,
    }
  }, [])

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
    showActionSheetWithOptions(
      {
        title: actionSheetOptions.title,
        options: actionSheetOptions.options,
        cancelButtonIndex: actionSheetOptions.cancelButtonIndex,
        destructiveButtonIndex: actionSheetOptions.destructiveButtonIndex,
      },
      onActionDone,
    )
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
