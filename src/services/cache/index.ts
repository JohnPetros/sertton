'use client'

import { useReactQueryCache } from './react-query'
import { Cache } from './types/Cache'

export function useCache<Data>(cache: Cache<Data>) {
  return useReactQueryCache(cache)
}
