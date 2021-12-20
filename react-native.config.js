module.exports = {
  dependencies: {
    // VIDEO_CALL_FLAG_ENABLED_BEGIN
    'react-native-twilio-video-webrtc': {
      platforms: {
        android: null, // enable/disable react-native-twilio-video-webrtc on Android platform.
      },
    },
    'react-native-webrtc': {
      platforms: {
        // android: null, // enable/disable react-native-webrtc on Android platform.
      },
    },
    // VIDEO_CALL_FLAG_ENABLED_END
  },
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./assets/fonts/'], // stays the same
};

// Please note that for Android platform, you must comment out one of react-native-twilio-video-webrtc or react-native-webrtc to use the other.
// A dependency conflict will occur on Android platform if you do not comment out one of the two.
