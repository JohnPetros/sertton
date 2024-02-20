import { usePathname, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

import { useProductsFilterStore } from '@/stores/ProductsFilterStore'
import { ROUTES } from '@/utils/constants/routes'

export function useSearch(isFetching: boolean) {
  const setSearch = useProductsFilterStore((store) => store.actions.setSearch)
  const currentSearchValue = useProductsFilterStore(
    (store) => store.state.search
  )
  const [searchValue, setSearchValue] = useState(currentSearchValue)
  const [isLoading, setIsloading] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  function handleSearch() {
    if (!isFetching) {
      setSearch(searchValue.trim())
      if (pathname !== ROUTES.products) router.push('/(stack)/(drawer)/(tabs)/products')
      Keyboard.dismiss()
    }
  }

  useEffect(() => {
    setIsloading(Boolean(isFetching))
  }, [isFetching])

  useEffect(() => {
    setSearchValue(currentSearchValue)
  }, [currentSearchValue])

  return {
    searchValue,
    isLoading,
    setSearchValue,
    handleSearch,
  }
}
