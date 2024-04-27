import { useQuery as useReactQuery, useQueryClient } from 'react-query'
import { Cache } from '../types/Cache'

export function useReactQueryCache<Data>({
  key,
  fetcher = async () => undefined,
  dependencies = [],
  isEnabled = true,
}: Cache<Data>) {
  const queryClient = useQueryClient()

  const { data, error, isLoading, isFetching, refetch } = useReactQuery({
    queryKey: [key, ...dependencies],
    queryFn: fetcher,
    enabled: isEnabled,
  })

  function mutateCache(newData: Data) {
    queryClient.setQueryData(key, newData)
  }

  return {
    data,
    error,
    isLoading,
    isFetching,
    mutate: mutateCache,
    refetch,
  }
}
