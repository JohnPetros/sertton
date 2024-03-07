import { productsMock } from "@/_tests_/mocks/core/productsMock"
import { useProductsList } from "../../useProductList"

export function useProductsListMock(returnMock?: Partial<ReturnType<typeof useProductsList>>) {
  jest.mocked(useProductsList).mockReturnValueOnce({
    handleListEndReached: jest.fn(),
    handleSelectChange: jest.fn(),
    data: productsMock,
    productWidth: 100,
    ...returnMock,
  })

  return {
  }
}
