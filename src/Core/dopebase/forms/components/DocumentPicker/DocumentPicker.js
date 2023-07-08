import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as ExpoDocumentPicker from 'expo-document-picker'
import { useTheme, useTranslations } from '../../..'
import dynamicStyles from './styles'

export const DocumentPicker = ({ title, handleDocument = () => {} }) => {
  const { localized } = useTranslations()
  const { theme, appearance } = useTheme()
  const styles = dynamicStyles(theme, appearance)
  const [document, setDocument] = useState()

  const pickDocument = async () => {
    try {
      let res = await ExpoDocumentPicker.getDocumentAsync()
      if (res?.type !== 'cancel') {
        const doc = {
          ...res,
          type: 'file',
          fileID: +new Date() + res.name,
        }
        setDocument(doc)
        handleDocument(doc)
      }
    } catch (e) {
      console.warn(e)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{localized(title)}</Text>
      </View>
      <View style={styles.uploadDocumentBtnContainer}>
        <TouchableOpacity
          style={[
            styles.uploadDocumentBtn,
            document && {
              borderColor: '#51DC83FF',
            },
          ]}
          onPress={() => pickDocument()}>
          <Text
            style={[
              styles.uploadDocumentText,
              document && { color: '#51DC83FF' },
            ]}>
            {localized('Choose File')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
