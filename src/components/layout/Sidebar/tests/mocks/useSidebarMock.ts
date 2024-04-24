import { categoriesMock } from '@/_tests_/mocks/core/categoriesMock'

import { useSidebar } from '../../useSidebar'

const handleCategoryMock = jest.fn()
const handleNavigationMock = jest.fn()
const handleShowAllCategoriesMock = jest.fn()

export function useSidebarMock(
  mockedReturn?: Partial<ReturnType<typeof useSidebar>>,
) {
  jest.mocked(useSidebar).mockReturnValueOnce({
    categories: categoriesMock,
    canShowAllCategories: false,
    isLoading: false,
    handleShowAllCategories: handleShowAllCategoriesMock,
    handleCategory: handleCategoryMock,
    handleNavigation: handleNavigationMock,
    ...mockedReturn,
  })

  return {
    categoriesMock,
    handleShowAllCategoriesMock,
    handleCategoryMock,
    handleNavigationMock,
  }
}
