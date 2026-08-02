import { useCallback, useEffect, useMemo, useState } from "react"

import type { Product, Sku } from "@/core/catalog/entities"
import { calculateCartTotals } from "@/core/checkout/rules/cart-totals"
import { ExpoLinkProvider } from "@/providers/links/expo-link-provider"
import { useCartStore } from "@/ui/checkout/stores/cart-store"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

export interface CartDisplayItem {
  readonly imageUrl?: string
  readonly name: string
  readonly productId: string
  readonly quantity: number
  readonly sku: Sku
  readonly variation?: string
}

const toCartDisplayItem = (
  product: Product,
  skuId: string,
  quantity: number,
): CartDisplayItem | undefined => {
  const sku = product.skus.find((item) => item.id === skuId)
  if (!sku) return undefined

  const variation = sku.variations[0]
  return {
    imageUrl: sku.imageUrl || product.imageUrl,
    name: product.name,
    productId: product.id,
    quantity,
    sku,
    variation: variation ? `${variation.name}: ${variation.value}` : undefined,
  }
}

export const useCartScreen = () => {
  const { catalogService, checkoutService } = useRestContext()
  const { clear, hydrate, isHydrated, items, removeItem, setQuantity } = useCartStore()
  const [displayItems, setDisplayItems] = useState<readonly CartDisplayItem[]>([])
  const [error, setError] = useState<string>()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loadCartProducts = useCallback(async () => {
    if (!isHydrated) return
    if (items.length === 0) {
      setDisplayItems([])
      setError(undefined)
      return
    }

    setIsLoading(true)
    setError(undefined)
    const loadedItems = await Promise.all(
      items.map(async (item) => {
        if (item.product) return toCartDisplayItem(item.product, item.skuId, item.quantity)

        const response = await catalogService.fetchProduct(item.productId)
        return response.isSuccessful
          ? toCartDisplayItem(response.getBody(), item.skuId, item.quantity)
          : undefined
      }),
    )
    const validItems = loadedItems.filter((item): item is CartDisplayItem => item !== undefined)

    if (validItems.length !== items.length) {
      setError("Não foi possível carregar todos os produtos do carrinho.")
    }
    setDisplayItems(validItems)
    setIsLoading(false)
  }, [catalogService, isHydrated, items])

  useEffect(() => {
    if (!isHydrated) void hydrate()
  }, [hydrate, isHydrated])

  useEffect(() => {
    void loadCartProducts()
  }, [loadCartProducts])

  const totals = useMemo(
    () =>
      calculateCartTotals(
        displayItems.map((item) => ({
          discountPrice: item.sku.discountPrice,
          quantity: item.quantity,
          salePrice: item.sku.salePrice,
        })),
      ),
    [displayItems],
  )
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const canCheckout =
    !isCheckingOut && !isLoading && displayItems.length > 0 && displayItems.length === items.length

  const checkout = useCallback(async () => {
    if (!canCheckout) return

    setIsCheckingOut(true)
    setError(undefined)
    const response = await checkoutService.fetchCheckoutLink(
      displayItems.map((item) => item.sku.yampiToken),
      displayItems.map((item) => item.quantity),
    )
    if (response.isFailure) setError("Não foi possível iniciar o checkout.")
    else {
      await ExpoLinkProvider.open(response.getBody())
      clear()
    }
    setIsCheckingOut(false)
  }, [canCheckout, checkoutService, clear, displayItems])

  return {
    canCheckout,
    checkout,
    clear,
    displayItems,
    error,
    isCheckingOut,
    isHydrated,
    isLoading,
    itemCount,
    loadCartProducts,
    removeItem,
    setQuantity,
    totals,
  }
}
