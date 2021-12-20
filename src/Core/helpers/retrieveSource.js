import { Platform } from 'react-native'

exports.extractSourceFromFile = file => {
  const mime = file.mime || file.type
  const source = file.path || file.uri
  const uri = Platform.OS === 'ios' ? source.replace('file://', '') : source
  const filename =
    new Date() + '-' + source.substring(source.lastIndexOf('/') + 1)

  return { ...file, filename, source, uri, mime }
}
