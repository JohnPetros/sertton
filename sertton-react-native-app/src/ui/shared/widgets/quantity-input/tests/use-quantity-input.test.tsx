import { act, renderHook } from "@testing-library/react-native"

import { useQuantityInput } from "../use-quantity-input"

describe("useQuantityInput", () => {
  it("should clamp increment at the available stock when the quantity reaches its maximum", () => {
    const onChange = jest.fn()
    const { result } = renderHook(() => useQuantityInput({ max: 2, onChange, value: 2 }))

    act(() => result.current.increment())

    expect(result.current.isIncrementDisabled).toBe(true)
    expect(onChange).toHaveBeenCalledWith(2)
  })
})
