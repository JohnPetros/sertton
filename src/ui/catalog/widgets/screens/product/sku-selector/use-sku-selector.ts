import { useCallback, useMemo, useState } from "react"

import type { Sku } from "@/core/catalog/entities"

export const useSkuSelector = (
  skus: readonly Sku[],
  selectedSku: Sku | undefined,
  onSkuSelected: (sku: Sku) => void,
) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)

  const options = useMemo(
    () =>
      skus.map((sku) => ({
        label: sku.variations.map((variation) => variation.value).join(" · ") || sku.skuCode,
        sku,
      })),
    [skus],
  )
  const selectedLabel = useMemo(
    () =>
      selectedSku?.variations.map((variation) => variation.value).join(" · ") ||
      selectedSku?.skuCode,
    [selectedSku],
  )
  const closeOptions = useCallback(() => setIsOptionsOpen(false), [])
  const openOptions = useCallback(() => setIsOptionsOpen(true), [])
  const selectSku = useCallback(
    (sku: Sku) => {
      onSkuSelected(sku)
      closeOptions()
    },
    [closeOptions, onSkuSelected],
  )

  return { closeOptions, isOptionsOpen, openOptions, options, selectSku, selectedLabel }
}
