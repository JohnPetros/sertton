import type { YampiCollection } from '../types/YampiCollection'

import type { Collection } from '@/@types/Collection'

export const YampiCollectionAdapter = (yampiCollection: YampiCollection) => {
  const collection: Collection = {
    id: String(yampiCollection.id),
    name: yampiCollection.name,
    products: [],
  }

  return collection
}
