import React, { useEffect, useState } from 'react'
import { Video } from 'expo-av'
import { loadCachedItem } from '../../helpers/cacheManager'

export default function TNVideo(props) {
  const {
    source: { uri },
    videoRef,
    ...otherProps
  } = props

  const [cachedUri, setCachedUri] = useState(null)

  useEffect(() => {
    setCachedUri(uri)
    ;(async () => {
      const video = await loadCachedItem({ uri })
      await setCachedUri(video)
    })()
  }, [uri])

  return (
    <Video
      ref={videoRef}
      {...otherProps}
      source={{
        uri: cachedUri,
      }}
    />
  )
}
