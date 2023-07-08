const getPhotos = async () => {
  console.log(
    'CameraRoll.getPhotos() not available in Expo - use bare workflow instead for @react-native-camera-roll/camera-roll package',
  )
  alert(
    'Feature not available in Expo - use bare workflow instead for @react-native-camera-roll/camera-roll package',
  )
  return {}
}

const CameraRoll = {
  getPhotos,
}

export { CameraRoll }
