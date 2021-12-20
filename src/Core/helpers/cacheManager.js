import * as _ from 'lodash'
import * as FileSystem from 'expo-file-system'
import SHA1 from 'crypto-js/sha1'

const BASE_DIR = `${FileSystem.cacheDirectory}expo-cache/`

export class CacheEntry {
  constructor(uri, options) {
    this.uri = uri
    this.options = options
  }

  async getPath() {
    const { uri, options } = this
    const { path, exists, tmpPath } = await getCacheEntry(uri)
    if (exists) {
      return path
    }
    const result = await FileSystem.createDownloadResumable(
      uri,
      tmpPath,
      options,
    ).downloadAsync()
    // If the image download failed, we don't cache anything
    if (result && result.status !== 200) {
      return undefined
    }
    await FileSystem.moveAsync({ from: tmpPath, to: path })
    return path
  }
}

export default class CacheManager {
  static entries = {}

  static get(uri, options) {
    if (!CacheManager.entries[uri]) {
      CacheManager.entries[uri] = new CacheEntry(uri, options)
    }
    return CacheManager.entries[uri]
  }

  static async clearCache() {
    await FileSystem.deleteAsync(BASE_DIR, { idempotent: true })
    await FileSystem.makeDirectoryAsync(BASE_DIR)
  }

  static async getCacheSize() {
    const result = await FileSystem.getInfoAsync(BASE_DIR)
    if (!result.exists) {
      throw new Error(`${BASE_DIR} not found`)
    }
    return result.size
  }
}

const getCacheEntry = async uri => {
  const filename = uri.substring(
    uri.lastIndexOf('/'),
    uri.indexOf('?') === -1 ? uri.length : uri.indexOf('?'),
  )
  const ext =
    filename.indexOf('.') === -1
      ? '.jpg'
      : filename.substring(filename.lastIndexOf('.'))

  const path = `${BASE_DIR}${SHA1(uri)}${ext}`
  const tmpPath = `${BASE_DIR}${SHA1(uri)}-${_.uniqueId()}${ext}`
  // TODO: maybe we don't have to do this every time
  try {
    await FileSystem.makeDirectoryAsync(BASE_DIR)
  } catch (e) {
    // do nothing
  }
  const info = await FileSystem.getInfoAsync(path)
  const { exists } = info
  return { exists, path, tmpPath }
}

export const loadCachedItem = async ({ uri, options = {} }) => {
  if (uri) {
    try {
      const path = await CacheManager.get(uri, options).getPath()

      if (path) {
        return path
      } else {
        return uri
      }
    } catch (error) {
      return uri
    }
  }
}
