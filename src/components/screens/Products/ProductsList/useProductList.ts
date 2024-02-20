import { useEffect, useRef, useState } from 'react'

import { ProductsListProps } from '.'


import { useProductsFilterStore } from '@/stores/ProductsFilterStore'

import { SCREEN } from '@/utils/constants/screen'
import { SORTERS } from '@/utils/constants/sorters'
import { wait } from '@/utils/helpers/wait'

type Layout = 'mosaic' | 'list'

export function useProductsList({
  products,
  onEndReached,
  setSelectedSorter,
}: Omit<ProductsListProps, 'isLoading' | 'hasNextPage' | 'onRefresh'>) {
  const [layout, setLayout] = useState<Layout>('list')
  const [isFiltersDialogLoading, setIsFiltersDialogLoading] = useState(false)
  const isFetching = useRef(false)
  const totalProducts = useRef(0)
  const data = products.slice(0)

  const currentSearchValue = useProductsFilterStore(
    (store) => store.state.search
  )

  const productWidth =
    layout === 'list'
      ? SCREEN.width - SCREEN.paddingX * 2
      : (SCREEN.width - SCREEN.paddingX * 2) / 2 - 12

  function handleLayoutToggle() {
    setLayout(layout === 'list' ? 'mosaic' : 'list')
  }

  function handleSelectChange(sorterName: string) {
    const sorter = SORTERS.find((sorte) => sorte.name === sorterName) ?? null
    setSelectedSorter(sorter)
  }

  function handleListEndReached() {
    if (!isFetching.current) {
      isFetching.current = true
      onEndReached()
    }
  }

  async function handleFiltersDialogButton() {
    setIsFiltersDialogLoading(true)
    await wait(1500)
    setIsFiltersDialogLoading(false)
  }

  useEffect(() => {
    if (products.length > totalProducts.current) {
      totalProducts.current = products.length
      isFetching.current = false
    }
  }, [products])

  useEffect(() => {
    totalProducts.current = 0
  }, [currentSearchValue])

  return {
    data,
    layout,
    productWidth,
    isFiltersDialogLoading,
    handleFiltersDialogButton,
    handleSelectChange,
    handleListEndReached,
    handleLayoutToggle,
  }
}
