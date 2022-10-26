import storage from '@react-native-firebase/storage'
import { ErrorCode } from '../../../onboarding/api/ErrorCode'
import { processMediaFile } from '../../mediaProcessor'

const uploadFile = async (processedUri, callbackProgress) => {
  let finished = false
  const filename = processedUri.substring(processedUri.lastIndexOf('/') + 1)
  const storageRef = storage().ref()
  const fileRef = storageRef.child(filename)
  const uploadTask = fileRef.putFile(processedUri)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      storage.TaskEvent.STATE_CHANGED,
      snapshot => {
        if (snapshot.state == storage.TaskState.SUCCESS) {
          if (finished == true) {
            return
          }
          finished = true
        }

        callbackProgress?.(snapshot.bytesTransferred, snapshot.totalBytes)
      },
      error => {
        console.log('upload error:', error)
        reject(error)
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL)
          resolve(downloadURL)
        })
      },
    )
  })
}

const processAndUploadMediaFileWithProgressTracking = (
  file,
  callbackProgress,
  callbackSuccess,
  callbackError,
) => {
  processMediaFile(file, ({ processedUri, thumbnail }) => {
    // Success handler with SUCCESS is called multiple times on Android. We need work around that to ensure we only call it once
    uploadFile(processedUri, callbackProgress)
      .then(downloadURL => {
        if (thumbnail) {
          uploadFile(thumbnail, callbackProgress)
            .then(thumbnailURL => {
              callbackSuccess(downloadURL, thumbnailURL)
            })
            .catch(callbackError)

          return
        }
        callbackSuccess(downloadURL)
      })
      .catch(callbackError)
  })
}

const processAndUploadMediaFile = file => {
  return new Promise((resolve, _reject) => {
    processMediaFile(file, ({ processedUri, thumbnail }) => {
      uploadFile(processedUri)
        .then(downloadURL => {
          if (thumbnail) {
            uploadFile(thumbnail)
              .then(thumbnailURL => {
                resolve({ downloadURL, thumbnailURL })
              })
              .catch(() => resolve({ error: ErrorCode.photoUploadFailed }))

            return
          }
          resolve({ downloadURL })
        })
        .catch(() => resolve({ error: ErrorCode.photoUploadFailed }))
    })
  })
}

const firebaseStorage = {
  processAndUploadMediaFile,
  processAndUploadMediaFileWithProgressTracking,
}

export default firebaseStorage
