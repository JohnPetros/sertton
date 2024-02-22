export function removeObjectFromArray<ObjectData>(array: ObjectData[], object: ObjectData) {
  const index = array.indexOf(object)
  if (index !== -1) array.splice(index, 1)
}
