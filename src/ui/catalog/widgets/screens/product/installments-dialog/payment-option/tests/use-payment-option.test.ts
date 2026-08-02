import { act, renderHook } from "@testing-library/react-native"

import { usePaymentOption } from "../use-payment-option"

describe("usePaymentOption", () => {
  it("should pass its payment ID to the selection callback", () => {
    const onSelect = jest.fn()
    const { result } = renderHook(() => usePaymentOption("payment-1", onSelect))

    act(() => result.current.select())

    expect(onSelect).toHaveBeenCalledWith("payment-1")
  })
})
