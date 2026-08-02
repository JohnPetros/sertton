import { renderHook } from "@testing-library/react-native"

import { useProductDescription } from "../use-product-description"

describe("useProductDescription", () => {
  it("should convert rich text into readable plain text", () => {
    const { result } = renderHook(() =>
      useProductDescription(
        "<p>First&nbsp;line</p><ul><li>Second</li><li>Third &amp; final</li></ul><br />Done",
        "<h2>Specs</h2><div>Aluminum</div>",
      ),
    )

    expect(result.current.formattedDescription).toBe(
      "First line\n• Second\n• Third & final\n\nDone",
    )
    expect(result.current.formattedSpecifications).toBe("Specs\nAluminum")
  })

  it("should return empty strings for empty sections", () => {
    const { result } = renderHook(() => useProductDescription("", ""))

    expect(result.current).toEqual({
      formattedDescription: "",
      formattedSpecifications: "",
    })
  })
})
