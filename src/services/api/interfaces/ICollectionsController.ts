import type { Collection } from '@/@types/Collection'

export interface ICollectionsController {
  getCollections(): Promise<Collection[]>
}
