import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import * as ExpoImagePicker from 'expo-image-picker'
import { useTheme, useTranslations } from '../../../core'
import dynamicStyles from './styles'

export const ImagePicker = ({
  title,
  value,
  allowsMultipleSelection = false,
  handleImages = () => {},
}) => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [image, setImage] = useState(value)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: allowsMultipleSelection,
      mediaTypes: ExpoImagePicker.MediaTypeOptions.All,
      allowsEditing: !allowsMultipleSelection,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result?.cancelled) {
      /*
      Sample Return Structure, Array of Images
       [{"assetId": "99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7/L0/001",
       "fileName": "IMG_0004.jpg",
       "fileSize": 2275045,
       "height": 2500,
       "type": "image",
       "uri": "file:///Users/mac/Library/Developer/CoreSimulator/Devices/10F9C0E6-9588-4808-A1B4-8FDD355701A7/data/Containers/Data/Application/18D520A7-0147-45FA-91C2-D1D327EE74A3/Library/Caches/ExponentExperienceData/%2540mohsinzahid%252FInstamobileX/ImagePicker/CC25A986-5352-49C2-ACEF-ECD912A14092.jpg", "width": 1668}, {"assetId": "9F983DBA-EC35-42B8-8773-B597CF782EDD/L0/001", "fileName": "IMG_0003.jpg", "fileSize": 4395292, "height": 2002, "type": "image", "uri": "file:///Users/mac/Library/Developer/CoreSimulator/Devices/10F9C0E6-9588-4808-A1B4-8FDD355701A7/data/Containers/Data/Application/18D520A7-0147-45FA-91C2-D1D327EE74A3/Library/Caches/ExponentExperienceData/%2540mohsinzahid%252FInstamobileX/ImagePicker/82EA945C-AF2A-49DF-A0C0-4EEDDEDB4C3E.jpg",
       "width": 3000
       }]
       */
      handleImages(result?.selected ? result?.selected : result)
      setImage(result)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{localized(title)}</Text>
      </View>
      {image && (
        <Image
          source={{
            uri: image?.downloadURL || image?.uri,
          }}
          style={styles.image}
        />
      )}
      <View
        style={[
          styles.uploadImageBtnContainer,
          image ? { marginTop: 16 } : {},
        ]}>
        <TouchableOpacity
          style={styles.uploadImageBtn}
          onPress={() => pickImage()}>
          <Text style={styles.uploadImageText}>
            {localized('Upload Image')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
