export function removeObjectFromArray<O>(array: O[], object: O) {
  const index = array.indexOf(object)
  if (index !== -1) array.splice(index, 1)
}
