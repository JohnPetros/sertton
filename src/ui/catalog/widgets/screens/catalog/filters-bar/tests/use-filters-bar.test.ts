import { act, renderHook } from "@testing-library/react-native"

import { useFiltersBar } from "../use-filters-bar"

describe("useFiltersBar", () => {
  it("should open and close both filter modals", () => {
    const { result } = renderHook(() => useFiltersBar())

    expect(result.current.isBrandsModalVisible).toBe(false)
    expect(result.current.isCategoriesModalVisible).toBe(false)

    act(() => result.current.openBrandsModal())
    act(() => result.current.openCategoriesModal())
    expect(result.current.isBrandsModalVisible).toBe(true)
    expect(result.current.isCategoriesModalVisible).toBe(true)

    act(() => result.current.closeBrandsModal())
    act(() => result.current.closeCategoriesModal())
    expect(result.current.isBrandsModalVisible).toBe(false)
    expect(result.current.isCategoriesModalVisible).toBe(false)
  })
})
