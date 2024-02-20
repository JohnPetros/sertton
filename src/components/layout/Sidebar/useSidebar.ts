import { useApi } from '@/services/api'
import { DrawerActions } from '@react-navigation/native'
import { AllRoutes, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

// import { useAppError } from '../../shared/AppError/useAppError'

import { useCache } from '@/services/cache'
import { useProductsFilterStore } from '@/stores/ProductsFilterStore'
import { CACHE } from '@/utils/constants/cache'
import { useDrawerStatus } from '@react-navigation/drawer'

export function useSidebar() {
  const [canShowAllCategories, setCanShowAllCategories] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const setCategoryId = useProductsFilterStore(
    (store) => store.actions.setCategoryId
  )

  const api = useApi()
  const router = useRouter()
  const isOpen = useDrawerStatus()
  // const { throwAppError } = useAppError()

  const { data: categories, error } = useCache({
    key: CACHE.keys.categories,
    fetcher: api.getCategories,
  })

  // if (error) {
  //   throwAppError('Error ao mostrar categorias')
  // }

  function handleShowAllCategories() {
    setCanShowAllCategories(!canShowAllCategories)
  }

  function handleCategory(categoryId: string) {
    setIsLoading(true)
    setCategoryId(categoryId)
    router.push('/(stack)/(drawer)/(tabs)/products')
  }

  function handleNavigation(route: AllRoutes) {
    DrawerActions.closeDrawer()
    // @ts-ignore
    router.push(route)
  }

  useEffect(() => {
    if (isOpen === 'closed') setIsLoading(false)
  }, [isOpen])

  return {
    canShowAllCategories,
    isLoading,
    categories,
    handleCategory,
    handleShowAllCategories,
    handleNavigation,
  }
}
