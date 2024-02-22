import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import type { Sku } from '@/@types/Sku'

import { useToast } from '@/utils/hooks/useToast'

import { useCartStore } from '@/stores/CartStore'

export function useCartItem(skus: Sku[], selectedSkuId: string) {
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)

  const removeItem = useCartStore((store) => store.actions.removeItem)
  const setItemQuantity = useCartStore((store) => store.actions.setItemQuantity)

  const setQuantityDebounce = useDebouncedCallback((newQuantity) => {
    if (selectedSku && newQuantity <= selectedSku.stock) {
      setItemQuantity(selectedSku.id, newQuantity)
    }
  }, 700)

  const toast = useToast()

  function handleQuantityChange(newQuantity: number) {
    setQuantityDebounce(newQuantity)
  }

  function handleRemoveItem() {
    if (selectedSku) removeItem(selectedSku.id)
  }

  function handleReachMaxInStock() {
    if (selectedSku)
      toast.show(
        `Quantidade indisponível.\nDisponível em estoque: ${selectedSku.stock}`,
        'error'
      )
  }

  function selectSku() {
    const selectedSku = skus.find((sku) => sku.id === selectedSkuId)

    if (selectedSku) setSelectedSku(selectedSku)
  }

  useEffect(() => {
    selectSku()
  }, [])

  return {
    selectedSku,
    handleQuantityChange,
    handleRemoveItem,
    handleReachMaxInStock,
  }
}
