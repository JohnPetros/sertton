import { renderHook } from '@/_tests_/customs/customRenderHook'
import { useRefMock } from '@/_tests_/mocks/libs/react/useRefMock'
import { useFiltersDialog } from '../useFiltersDialog'
import { brandsMock } from '@/_tests_/mocks/core/brandsMock'
import { DialogRef } from '../../Dialog/types/DialogRef'
import { useProductsFilterStoreMock } from '@/_tests_/mocks/stores/ProductsFilterStoreMock'

describe('useFiltersDialog hook', () => {
  it('should add brand id if the brand checkbox was checked', () => {
    useProductsFilterStoreMock()

    const dialogRefMock = useRefMock<DialogRef>({
      close: jest.fn(),
      open: jest.fn(),
    })

    const { result } = renderHook(() =>
      useFiltersDialog(brandsMock, dialogRefMock),
    )

    const brandId = 'brand id mock'

    result.current.handleBrandCheckbox(brandId, true)

    expect(result.current.brandsIds.current).toEqual([brandId])
  })

  it('should remove brand id if the brand checkbox was unchecked', () => {
    useProductsFilterStoreMock()

    const dialogRefMock = useRefMock<DialogRef>({
      close: jest.fn(),
      open: jest.fn(),
    })

    const { result } = renderHook(() =>
      useFiltersDialog(brandsMock, dialogRefMock),
    )

    const brandId = 'brand id mock'

    result.current.handleBrandCheckbox(brandId, true)

    expect(result.current.brandsIds.current).toEqual([brandId])

    result.current.handleBrandCheckbox(brandId, false)

    expect(result.current.brandsIds.current).toEqual([])
  })

  it('should return checked brands ids is from store', () => {
    const checkedBrandsIds = ['1', '2', '3', '4', '5']

    useProductsFilterStoreMock({ brandsIds: checkedBrandsIds })

    const dialogRefMock = useRefMock<DialogRef>({
      close: jest.fn(),
      open: jest.fn(),
    })

    const { result } = renderHook(() =>
      useFiltersDialog(brandsMock, dialogRefMock),
    )

    expect(result.current.checkedBrandsIds).toEqual(checkedBrandsIds)
  })

  it('should set brands ids as the checked brands ids from store on open dialog', () => {
    const checkedBrandsIds = ['1', '2', '3', '4', '5']

    useProductsFilterStoreMock({ brandsIds: checkedBrandsIds })

    const dialogRefMock = useRefMock<DialogRef>({
      close: jest.fn(),
      open: jest.fn(),
    })

    const { result } = renderHook(() =>
      useFiltersDialog(brandsMock, dialogRefMock),
    )

    expect(result.current.brandsIds.current).toEqual(checkedBrandsIds)
  })

  it('should set brands ids from store on close dialog', () => {
    const brandIds = ['1', '2', '3']

    const { setBrandsIdsMock } = useProductsFilterStoreMock()

    const dialogRefMock = useRefMock<DialogRef>({
      close: jest.fn(),
      open: jest.fn(),
    })

    const { result } = renderHook(() =>
      useFiltersDialog(brandsMock, dialogRefMock),
    )

    for (const brandId of brandIds) {
      result.current.handleBrandCheckbox(brandId, true)
    }

    result.current.handleFilterButton()

    expect(setBrandsIdsMock).toHaveBeenCalledWith(brandIds)
  })
})
