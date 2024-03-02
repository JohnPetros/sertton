import { act, waitFor } from '@testing-library/react-native'

import { useTags } from '../useTags'
import { useApiMock } from '@/_tests_/mocks/services/apiMock'
import { useProductsFilterStore } from '@/stores/ProductsFilterStore'
import { renderHook } from '@/_tests_/customs/customRenderHook'


jest.mock('@/services/api')

const setBrandsIdsMock = jest.fn()

async function renderUseTagsHook(selectedBrandsIds: string[]) {
  act(() => {
    useProductsFilterStore.setState({
      actions: {
        setBrandsIds: setBrandsIdsMock,
        setSearch: jest.fn(),
        setCategoryId: jest.fn(),
      },
      state: {
        search: '',
        categoryId: '',
        brandsIds: selectedBrandsIds,
      },
    })
  })

  return await waitFor(() => renderHook(useTags))
}

describe('useTags hook', () => {

  it('should remove a selected brand id and tag', async () => {
    const apiMock = useApiMock()
    const brandsMock = await apiMock.getBrands()
    const removedBrand = brandsMock[0]

    const selectedBrandsIdsMock = [...brandsMock.map(({ id }) => id)]

    const { result } = await renderUseTagsHook(selectedBrandsIdsMock)

    act(() => {
      result.current.handleTag('brand', removedBrand.id)
    })

    expect(setBrandsIdsMock).toHaveBeenCalledWith(
      selectedBrandsIdsMock.slice(1)
    )
  })

  it('should return brands and tags if there are selected brands', async () => {
    const apiMock = useApiMock()
    const brandsMock = await apiMock.getBrands()

    const selectedBrandsIdsMock = [...brandsMock.map(({ id }) => id)]

    const { result } = await renderUseTagsHook(selectedBrandsIdsMock)

    expect(result.current.brands).toEqual(brandsMock)
    expect(result.current.tags).toEqual(
      brandsMock.map((brand) => ({
        id: brand.id,
        type: 'brand',
        title: brand.name,
      }))
    )
  })
})
