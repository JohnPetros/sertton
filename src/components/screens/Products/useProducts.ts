import { useMemo, useRef, useState } from 'react'
import { useInfiniteQuery } from 'react-query'

import { Product } from '@/@types/Product'
import { Sorter } from '@/@types/Sorter'

import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'

import { useProductsFilterStore } from '@/stores/ProductsFilterStore'

import { CACHE } from '@/utils/constants/cache'
import { useToast } from '@/utils/hooks/useToast'

export function useProducts() {
  const api = useApi()

  const currentPage = useRef(0)
  const hasNextPage = useRef(true)

  const toast = useToast()

  const { search, categoryId, brandsIds } = useProductsFilterStore(
    (store) => store.state,
  )
  const setCategoryId = useProductsFilterStore(
    (store) => store.actions.setCategoryId,
  )

  const [selectedSorter, setSelectedSorter] = useState<Sorter | null>(null)

  async function getCategory() {
    try {
      return await api.getCategoryById(categoryId)
    } catch (error) {
      toast.show('Erro ao definir categoria de produtos', 'error')
    }
  }

  const { data: category } = useCache({
    key: CACHE.keys.category,
    fetcher: getCategory,
    dependencies: [categoryId],
    isEnabled: !!categoryId,
  })

  async function getProducts(page: number) {
    return await api.getProducts({
      page,
      search,
      sorter: selectedSorter,
      categoryId,
      brandsIds,
    })
  }

  const { data, isLoading, fetchNextPage, refetch } = useInfiniteQuery(
    ['products', selectedSorter, search, categoryId, brandsIds],
    ({ pageParam = 1 }) => {
      currentPage.current = pageParam
      console.log({ pageParam })
      return getProducts(pageParam)
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const currentTotalProductsCount = allPages.reduce(
          (total, currentPage) => {
            return total + currentPage.products.length
          },
          0,
        )

        let totalProductsCount = lastPage.totalProductsCount

        const restCount = totalProductsCount % 10

        if (totalProductsCount !== 1 && restCount !== 0) {
          totalProductsCount -= restCount
        }

        hasNextPage.current = currentTotalProductsCount < totalProductsCount

        return hasNextPage.current ? currentPage.current + 1 : undefined
      },
    },
  )

  function handleRemoveCategory() {
    setCategoryId('')
  }

  function handleProductsListEndReached() {
    fetchNextPage()
  }

  let products: Product[] = []

  products = useMemo(() => {
    if (!data) return []

    return data.pages.reduce((products, currentPage) => {
      return [...products, ...currentPage.products]
    }, [] as Product[])
  }, [data])

  console.log(products.length)

  return {
    products,
    category,
    isLoading,
    hasNextPage: products.length > 0 && hasNextPage.current,
    fetchNextPage,
    refetch,
    setSelectedSorter,
    handleProductsListEndReached,
    handleRemoveCategory,
  }
}
