import { act, renderHook } from "@testing-library/react-native"

import { SkuFaker } from "@/core/catalog/entities/fakers/sku-faker"
import { VariationFaker } from "@/core/catalog/entities/fakers/variation-faker"

import { useSkuSelector } from "../use-sku-selector"

describe("useSkuSelector", () => {
  it("should expose labels built from SKU variations", () => {
    const firstSku = SkuFaker.fake({
      skuCode: "SKU-1",
      variations: [VariationFaker.fake({ value: "Black" }), VariationFaker.fake({ value: "M" })],
    })
    const secondSku = SkuFaker.fake({ skuCode: "SKU-2" })
    const { result } = renderHook(() => useSkuSelector([firstSku, secondSku], firstSku, jest.fn()))

    expect(result.current.options).toEqual([
      { label: "Black · M", sku: firstSku },
      { label: "SKU-2", sku: secondSku },
    ])
    expect(result.current.selectedLabel).toBe("Black · M")
  })

  it("should select a SKU and close the options", () => {
    const selectedSku = SkuFaker.fake({ id: "sku-1" })
    const nextSku = SkuFaker.fake({ id: "sku-2" })
    const onSkuSelected = jest.fn()
    const { result } = renderHook(() =>
      useSkuSelector([selectedSku, nextSku], selectedSku, onSkuSelected),
    )

    act(() => result.current.openOptions())
    expect(result.current.isOptionsOpen).toBe(true)

    act(() => result.current.selectSku(nextSku))

    expect(onSkuSelected).toHaveBeenCalledWith(nextSku)
    expect(result.current.isOptionsOpen).toBe(false)
  })
})
