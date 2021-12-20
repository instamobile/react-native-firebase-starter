import React, { useEffect, useState } from 'react'
import Image from 'react-native-image-progress'
import CircleSnail from 'react-native-progress/CircleSnail'
import { loadCachedItem } from '../../helpers/cacheManager'

const circleSnailProps = { thickness: 1, color: '#ddd', size: 80 }

export default function TNImage(props) {
  const {
    source: { uri },
    ...otherProps
  } = props

  const [cachedUri, setCachedUri] = useState(uri)

  useEffect(() => {
    setCachedUri(uri)
    ;(async () => {
      const image = await loadCachedItem({ uri })
      await setCachedUri(image)
    })()
  }, [uri])

  return (
    <Image
      indicator={CircleSnail}
      indicatorProps={circleSnailProps}
      {...otherProps}
      source={{
        uri: cachedUri,
      }}
    />
  )
}
