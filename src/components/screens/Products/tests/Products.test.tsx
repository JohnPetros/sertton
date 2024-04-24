import { render } from '@/_tests_/customs/customRender'
import { Products } from '..'
import { useProductsMock } from './mocks/useProductsMock'
import { act, screen, userEvent } from '@testing-library/react-native'
import { categoriesMock } from '@/_tests_/mocks/core/categoriesMock'
import { useApiMock } from '@/_tests_/mocks/services/apiMock'

jest.mock('expo-router')
jest.mock('@react-navigation/drawer')
jest.mock('@/services/api')
jest.mock('../useProducts.ts')

describe('Products component', () => {
  it('should render the selected category name and description and remove category button if there is a selected category', () => {
    const categoryMock = categoriesMock[0]

    useProductsMock({ category: categoryMock })
    useApiMock()

    render(<Products />)

    const categoryName = screen.getByText(categoryMock.name)
    const categoryDescription = screen.getByText(categoryMock.description)
    const removeCategoryButton = screen.getByText('Remover categoria')

    expect(categoryName).toBeTruthy()
    expect(categoryDescription).toBeTruthy()
    expect(removeCategoryButton).toBeTruthy()
  })
})
