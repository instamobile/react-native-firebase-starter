import { Platform } from 'react-native'

export const extractSourceFromFile = file => {
  const type = file.type ?? file.mime
  const source = file.path || file.uri
  const uri = Platform.OS === 'ios' ? source.replace('file://', '') : source
  const filename =
    new Date() + '-' + source.substring(source.lastIndexOf('/') + 1)

  return { ...file, filename, source, uri, type }
}
