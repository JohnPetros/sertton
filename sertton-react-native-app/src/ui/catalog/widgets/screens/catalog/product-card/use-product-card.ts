import { router } from "expo-router"
import { useCallback, useState } from "react"

import type { Product } from "@/core/catalog/entities"
import { useCatalogStore } from "@/ui/catalog/stores/catalog-store"

export const useProductCard = (product: Product) => {
  const setSelectedProduct = useCatalogStore((state) => state.setSelectedProduct)
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false)
  const sku = product.skus[0]

  const openProduct = useCallback(() => {
    setSelectedProduct(product)
    router.push(`/(main)/(tabs)/catalog/${product.id}`)
  }, [product, setSelectedProduct])
  const closeCartDialog = useCallback(() => setIsCartDialogOpen(false), [])
  const openCartDialog = useCallback(() => setIsCartDialogOpen(true), [])

  return { closeCartDialog, isCartDialogOpen, openCartDialog, openProduct, sku }
}
