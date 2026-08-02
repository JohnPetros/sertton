import { act, renderHook } from "@testing-library/react-native"

import { useScaffoldScreen } from "../use-scaffold-screen"

describe("useScaffoldScreen", () => {
  it("should toggle the highlighted state when the action is called", () => {
    const { result } = renderHook(() => useScaffoldScreen())

    act(() => {
      result.current.toggleHighlight()
    })

    expect(result.current.isHighlighted).toBe(true)
  })
})
