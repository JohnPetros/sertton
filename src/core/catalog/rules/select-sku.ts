import type { Sku } from "@/core/catalog/entities/sku"

export const selectSku = (
  skus: readonly Sku[],
  selectedVariations: Readonly<Record<string, string>>,
): Sku | undefined =>
  skus.find((sku) =>
    Object.entries(selectedVariations).every(([name, value]) =>
      sku.variations.some(
        (variation) =>
          variation.name.toLocaleLowerCase() === name.toLocaleLowerCase() &&
          variation.value === value,
      ),
    ),
  )
