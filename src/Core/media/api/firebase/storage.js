import { Platform } from 'react-native'
import { uploadMediaFunctionURL } from '../../../firebase/config'
import { processMediaFile } from '../../mediaProcessor'

const uploadFile = async file => {
  const uri = file?.uri
  const fallbackName = Platform.select({
    native: uri.substring(uri?.lastIndexOf('/') + 1),
    default: 'webdefaultbase24',
  })

  const fileData = Platform.select({
    web: {
      name: file?.name ?? file?.fileName ?? fallbackName,
      fileName: file?.name ?? file?.fileName ?? fallbackName,
      ...file,
      uri: file?.uri,
      type: 'image',
    },
    default: {
      ...file,
      name: file?.name ?? file?.fileName ?? fallbackName,
    },
  })
  const formData = new FormData()
  formData.append('file', fileData)

  const res = await fetch(uploadMediaFunctionURL, {
    method: 'POST',
    body: formData,
    mode: 'no-cors',
    headers: Platform.select({
      web: new Headers({
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;boundary="boundary"',
      }),
      default: new Headers({
        'Content-Type': 'multipart/form-data',
      }),
    }),
  })
  const jsonData = await res.json()
  return jsonData?.downloadURL
}

const processAndUploadMediaFile = file => {
  return new Promise((resolve, _reject) => {
    processMediaFile(file, ({ processedUri, thumbnail }) => {
      uploadFile(file)
        .then(downloadURL => {
          if (thumbnail) {
            uploadFile(thumbnail)
              .then(thumbnailURL => {
                resolve({ downloadURL, thumbnailURL })
              })
              .catch(e => resolve({ error: 'photoUploadFailed' }))

            return
          }
          resolve({ downloadURL })
        })
        .catch(e => resolve({ error: 'photoUploadFailed' }))
    })
  })
}

const uploadMedia = async mediaAsset => {
  try {
    const response = await processAndUploadMediaFile(mediaAsset)
    return {
      ...mediaAsset,
      downloadURL: response.downloadURL,
      thumbnailURL: response.thumbnailURL ?? response.downloadURL,
    }
  } catch (error) {
    console.log('error uploading media', error)
    return null
  }
}

const firebaseStorage = {
  processAndUploadMediaFile,
  uploadMedia,
}

export default firebaseStorage
