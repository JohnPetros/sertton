import { renderHook } from "@testing-library/react-native"

import { useShortageTimeCounter } from "../use-shortage-time-counter"

describe("useShortageTimeCounter", () => {
  it("should expose a countdown formatted as hours, minutes, and seconds", () => {
    const { result } = renderHook(() => useShortageTimeCounter())

    expect(result.current.remainingTime).toMatch(/^\d{2}:\d{2}:\d{2}$/)
  })
})
