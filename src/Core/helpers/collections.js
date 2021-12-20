export const removeFromCollection = (
  collection,
  collectionPropertyToCompare,
  propertyFieldToRemove,
) => {
  return collection.filter(collectionItem => {
    return collectionItem[collectionPropertyToCompare] !== propertyFieldToRemove
  })
}

export const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key]
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj)
    return objectsByKeyValue
  }, {})
