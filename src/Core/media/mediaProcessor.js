import { Platform } from 'react-native'
import * as _ from 'lodash'
import * as FileSystem from 'expo-file-system'
import ImageResizer from 'react-native-image-resizer'
import uuidv4 from 'uuidv4'

const BASE_DIR = `${FileSystem.cacheDirectory}expo-cache/`

// Checks if given directory exists. If not, creates it
async function ensureDirExists(givenDir) {
  const dirInfo = await FileSystem.getInfoAsync(givenDir)
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(givenDir, { intermediates: true })
  }
}

export const downloadFile = async (file, fileName) => {
  try {
    await ensureDirExists(BASE_DIR)
    const fileUri = `${BASE_DIR}${fileName}`
    const info = await FileSystem.getInfoAsync(fileUri)
    const { exists, uri } = info

    if (exists) {
      return { uri }
    }

    const downloadResumable = FileSystem.createDownloadResumable(file, fileUri)

    return downloadResumable.downloadAsync()
  } catch (error) {
    return { uri: null }
  }
}


const resizeImage = async (
  {
    image,
    newWidth = 1100,
    newHeight = 1100,
    compressFormat = 'JPEG',
    quality = 100,
  },
  callback,
) => {
  const imagePath = image?.path || image?.uri

  if (image?.height < newHeight) {
    callback(imagePath)
    return
  }

  ImageResizer.createResizedImage(
    imagePath,
    newWidth,
    newHeight,
    compressFormat,
    quality,
  )
    .then(newSource => {
      if (newSource) {
        callback(newSource.uri)
      }
    })
    .catch(err => {
      callback(imagePath)
    })
}

/**
 * This function takes a media file object as the first argument and callback function as the second argument.
 * The media file object can either be a photo object or a video object.
 * If the media file is a photo object, this function resizes the photo and calls the callback function with an object of a processed uri.
 * If the media file is a video object, this function compresses the video file and creates a thumbnail from the compressed file. Then
 * calls the callback function with an object of a processed uri and thumbnail uri.
 * @param {object} file
 * @param {function} callback
 */
export const processMediaFile = (file, callback) => {
  const { mime, type, uri, path } = file
  const fileSource = uri || path


  const includesImage = mime?.includes('image') || type?.includes('image')
  if (includesImage) {
    resizeImage({ image: file }, processedUri => {
      callback({ processedUri })
    })
    return
  }
  callback({ processedUri: fileSource })
}

