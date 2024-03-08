import { useQuery } from 'react-query'

import { useApi } from '@/services/api'
import { useAppError } from '@/utils/hooks/useAppError'

export function useCollections() {
  const api = useApi()
  const { throwAppError } = useAppError()

  async function getProductsByCollection(collectionId: string) {
    return await api.getProductsByCollectionId(collectionId)
  }

  async function getCollections() {
    try {
      const collections = await api.getCollections()

      if (collections.length) {
        const result = []
        for (const collection of collections) {
          const products = await getProductsByCollection(collection.id)

          result.push({
            ...collection,
            products,
          })
        }

        return result
      }

      return collections
    } catch (error) {
      api.handleError(error)
      console.error(error)
      throwAppError('Erro ao mostrar coleções')
    }
  }

  const { data, error, isLoading } = useQuery('collections', getCollections)

  return {
    collections: data,
    error,
    areCollectionsLoading: isLoading,
  }
}
