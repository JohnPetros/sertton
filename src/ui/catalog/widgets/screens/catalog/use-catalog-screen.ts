import { useLocalSearchParams } from "expo-router"
import { useCallback, useEffect, useState } from "react"

import type { Brand, Category, Product } from "@/core/catalog/entities"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

export const useCatalogScreen = () => {
  const { catalogService } = useRestContext()
  const { query: routeQuery } = useLocalSearchParams<{ query?: string }>()
  const [brands, setBrands] = useState<readonly Brand[]>([])
  const [brandsIds, setBrandsIds] = useState<readonly string[]>([])
  const [categories, setCategories] = useState<readonly Category[]>([])
  const [categoryId, setCategoryId] = useState<string>()
  const [products, setProducts] = useState<readonly Product[]>([])
  const [query, setQuery] = useState(() => routeQuery ?? "")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const load = useCallback(
    async (nextPage = 1, replace = true) => {
      const setLoading = replace ? setIsLoading : setIsLoadingMore

      setLoading(true)
      setError(undefined)
      const response = await catalogService.fetchProducts({
        brandsIds,
        categoryId,
        page: nextPage,
        query,
      })
      if (response.isFailure) setError("Não foi possível carregar o catálogo.")
      else {
        const result = response.getBody()
        setProducts((current) => (replace ? result.items : [...current, ...result.items]))
        setPage(result.currentPage)
        setHasMore(result.currentPage < result.totalPages)
      }
      setLoading(false)
    },
    [brandsIds, catalogService, categoryId, query],
  )
  useEffect(() => {
    void load()
  }, [load])

  useEffect(() => {
    setQuery(routeQuery ?? "")
  }, [routeQuery])

  useEffect(() => {
    void Promise.all([catalogService.fetchBrands(), catalogService.fetchCategories()]).then(
      ([brandsResponse, categoriesResponse]) => {
        if (brandsResponse.isSuccessful) setBrands(brandsResponse.getBody())
        if (categoriesResponse.isSuccessful) setCategories(categoriesResponse.getBody())
      },
    )
  }, [catalogService])

  return {
    brands,
    brandsIds,
    categories,
    categoryId,
    error,
    hasMore,
    isLoading,
    loadMore: () => (hasMore && !isLoading && !isLoadingMore ? load(page + 1, false) : undefined),
    products,
    query,
    refresh: () => load(),
    setBrandsIds,
    setCategoryId,
    setQuery,
  }
}
