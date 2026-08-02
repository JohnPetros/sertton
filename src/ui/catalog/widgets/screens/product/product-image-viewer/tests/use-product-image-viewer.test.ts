import { act, renderHook } from "@testing-library/react-native"

import { useProductImageViewer } from "../use-product-image-viewer"

describe("useProductImageViewer", () => {
  it("should toggle the zoom state", () => {
    const { result } = renderHook(() => useProductImageViewer())

    expect(result.current.isZoomOpen).toBe(false)
    act(() => result.current.openZoom())
    expect(result.current.isZoomOpen).toBe(true)
    act(() => result.current.closeZoom())
    expect(result.current.isZoomOpen).toBe(false)
  })
})
