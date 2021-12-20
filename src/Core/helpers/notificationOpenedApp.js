import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'

const useNotificationOpenedApp = () => {
  const navigation = useNavigation()

  useEffect(() => {
    registerOnNotificationOpenedApp()
  }, [])

  const registerOnNotificationOpenedApp = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      const {
        data: { channelID, type, name },
      } = remoteMessage

      if (type === 'chat_message') {
        handleChatMessageType(channelID, name)
      }
    })
  }

  const handleChatMessageType = (channelID, name) => {
    const channel = {
      id: channelID,
      channelID,
      name,
    }

    navigation?.navigate('PersonalChat', {
      channel,
      openedFromPushNotification: true,
    })
  }
}

export default useNotificationOpenedApp
