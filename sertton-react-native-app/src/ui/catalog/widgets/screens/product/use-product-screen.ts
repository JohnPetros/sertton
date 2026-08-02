import { router } from "expo-router"
import { useCallback, useEffect, useMemo, useState } from "react"
import type { Product, Sku } from "@/core/catalog/entities"
import { useCatalogStore } from "@/ui/catalog/stores/catalog-store"
import { useCartStore } from "@/ui/checkout/stores/cart-store"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

export const useProductScreen = (productId: string) => {
  const { catalogService } = useRestContext()
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const cachedProduct = useCatalogStore((state) => state.selectedProduct)
  const cachedProductForRoute = cachedProduct?.id === productId ? cachedProduct : undefined
  const [product, setProduct] = useState<Product | undefined>(cachedProductForRoute)
  const [selectedSku, setSelectedSku] = useState<Sku | undefined>(cachedProductForRoute?.skus[0])
  const cartItem = useCartStore((state) =>
    state.items.find((item) => item.skuId === selectedSku?.id),
  )
  const [quantity, setQuantity] = useState(1)
  const [isInstallmentsOpen, setIsInstallmentsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(!cachedProductForRoute)
  const [error, setError] = useState<string>()
  const load = useCallback(async () => {
    if (cachedProductForRoute) return
    setIsLoading(true)
    const response = await catalogService.fetchProduct(productId)
    if (response.isFailure) setError("Não foi possível carregar este produto.")
    else {
      const value = response.getBody()
      setProduct(value)
      setSelectedSku(value.skus[0])
    }
    setIsLoading(false)
  }, [cachedProductForRoute, catalogService, productId])
  useEffect(() => {
    void load()
  }, [load])
  const addToCart = useCallback(() => {
    if (!product || !selectedSku || selectedSku.stock <= 0) return
    addItem({ product, productId, quantity, skuId: selectedSku.id })
  }, [addItem, product, productId, quantity, selectedSku])

  const removeFromCart = useCallback(() => {
    if (selectedSku) removeItem(selectedSku.id)
  }, [removeItem, selectedSku])

  const selectSku = useCallback((sku: Sku) => {
    setSelectedSku(sku)
    setQuantity(1)
  }, [])

  const changeQuantity = useCallback(
    (value: number) => {
      const maxQuantity = Math.max(selectedSku?.stock ?? 1, 1)
      setQuantity(Math.min(Math.max(value, 1), maxQuantity))
    },
    [selectedSku?.stock],
  )

  const variationLabel = useMemo(
    () => product?.skus[0]?.variations[0]?.name ?? "Variação",
    [product?.skus],
  )

  return {
    addToCart,
    canAddToCart: Boolean(selectedSku && selectedSku.stock > 0),
    cartQuantity: cartItem?.quantity ?? 0,
    changeQuantity,
    closeInstallments: () => setIsInstallmentsOpen(false),
    error,
    goBack: router.back,
    isLoading,
    isInstallmentsOpen,
    openInstallments: () => setIsInstallmentsOpen(true),
    product,
    quantity,
    removeFromCart,
    selectedSku,
    selectSku,
    variationLabel,
  }
}
