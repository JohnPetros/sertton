import { DrawerActions } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ROUTES } from 'src/utils/constants/routes'

// import { useAppError } from '../../shared/AppError/useAppError'

// import { useCache } from '@/services/cache'
// import { useProductsFilterStore } from '@/stores/productsFilterStore'
// import { CACHE } from '@/utils/constants/cache'
// import { ROUTES } from '@/utils/constants/routes'

export function useSidebar() {
  const [canShowAllCategories, setCanShowAllCategories] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // const setCategoryId = useProductsFilterStore(
  //   (store) => store.actions.setCategoryId
  // )

  // const api = useApi()
  const router = useRouter()
  // const isOpen = useDrawerStatus()
  // const { throwAppError } = useAppError()

  // const { data: categories, error } = useCache({
  //   key: CACHE.keys.categories,
  //   fetcher: api.getCategories,
  // })

  // if (error) {
  //   throwAppError('Error ao mostrar categorias')
  // }

  function handleShowAllCategories() {
    setCanShowAllCategories(!canShowAllCategories)
  }

  function handleCategory(categoryId: string) {
    setIsLoading(true)
    // setCategoryId(categoryId)
    router.push(ROUTES.products)
  }

  function handleNavigation(route: string) {
    DrawerActions.closeDrawer()
    router.push(route)
  }

  // useEffect(() => {
  //   if (isOpen === 'closed') setIsLoading(false)
  // }, [isOpen])

  return {
    canShowAllCategories,
    isLoading,
    categories: [],
    handleCategory,
    handleShowAllCategories,
    handleNavigation,
  }
}
