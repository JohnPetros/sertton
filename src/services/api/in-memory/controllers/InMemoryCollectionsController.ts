import { ICollectionsController } from '../../interfaces/ICollectionsController'

import { Collection } from '@/@types/Collection'
import { collectionsMock } from '@/_tests_/mocks/core/collectionsMock'

export function InMemoryCollectionsController(): ICollectionsController {
  const collections: Collection[] = collectionsMock

  return {
    async getCollections() {
      return collections
    },
  }
}
