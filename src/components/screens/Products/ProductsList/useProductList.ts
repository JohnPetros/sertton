import { useEffect, useRef } from 'react'

import { useProductsFilterStore } from '@/stores/ProductsFilterStore'

import { SCREEN } from '@/utils/constants/screen'
import { SORTERS } from '@/utils/constants/sorters'

import { ProductsListProps } from '.'

export function useProductsList({
  products,
  onEndReached,
  onSelectSorter,
}: Omit<ProductsListProps, 'isLoading' | 'hasNextPage' | 'onRefresh'>) {
  const isFetching = useRef(false)
  const totalProductsCount = useRef(0)
  const data = products.slice(0)

  const currentSearchValue = useProductsFilterStore(
    (store) => store.state.search
  )

  const productWidth = SCREEN.width - SCREEN.paddingX * 2

  function handleSelectChange(sorterName: string) {
    const sorter = SORTERS.find((sorte) => sorte.name === sorterName) ?? null
    onSelectSorter(sorter)
  }

  function handleListEndReached() {
    if (!isFetching.current) {
      isFetching.current = true
      onEndReached()
    }
  }

  useEffect(() => {
    if (products.length > totalProductsCount.current) {
      totalProductsCount.current = products.length
      isFetching.current = false
    }
  }, [products])

  useEffect(() => {
    if (currentSearchValue)
      totalProductsCount.current = 0
  }, [currentSearchValue])

  return {
    data,
    productWidth,
    handleSelectChange,
    handleListEndReached,
  }
}
