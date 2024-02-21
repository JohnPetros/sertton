import { useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'

import { ScrollView } from 'tamagui'

import type { Sku } from '@/@types/Sku'
import { SkuSelectorsRef } from '@/components/shared/SkuSelectors/types/SkuSelectorsRef'

import { useApi } from '@/services/api'
import { useCartStore } from '@/stores/CartStore'

export function useProductDetails(slug: string) {
  const api = useApi()

  const {
    data: product,
    isLoading: isProductLoading,
    refetch,
  } = useQuery(['product', slug], () => api.getProductBySlug(slug))

  const { data: similarProducts } = useQuery(
    ['similiar_products', product?.id],
    () => api.getSimiliarProducts(String(product?.id)),
    {
      enabled: !!product?.id,
    }
  )

  const addItem = useCartStore((store) => store.actions.addItem)

  const [isLoading, setIsLoading] = useState(isProductLoading)
  const [selectedSku, setSelectedSku] = useState<Sku | null>(null)
  const skuSelectsRef = useRef<SkuSelectorsRef | null>(null)
  const scrollRef = useRef<ScrollView | null>(null)
  const quantity = useRef(1)

  const router = useRouter()

  const hasVariations = Boolean(
    skuSelectsRef.current?.selectedSku?.variations.length
  )

  function handleSkuChange(sku: Sku) {
    setSelectedSku(sku)
  }

  function handleQuantityChange(newQuantity: number) {
    quantity.current = newQuantity
  }

  function handleAddToCart() {
    const shouldAddTocart = skuSelectsRef.current?.onAddSkuToCart()

    if (hasVariations && !shouldAddTocart) return

    if (product && selectedSku) {
      addItem({
        slug: product.slug,
        skuId: selectedSku.id,
        quantity: quantity.current,
      })
      router.push('/(stack)/(drawer)/(tabs)/cart')
    }
  }

  useEffect(() => {
    if (selectedSku) setIsLoading(false)
  }, [selectedSku])

  useFocusEffect(
    useCallback(() => {
      return () => {
        setIsLoading(true)
        setSelectedSku(null)
        scrollRef.current?.scrollTo({ y: 0 })
        quantity.current = 1
      }
    }, [])
  )

  return {
    product,
    similarProducts,
    scrollRef,
    skuSelectsRef,
    selectedSku,
    isLoading: isLoading || isProductLoading,
    hasVariations,
    quantity: quantity.current,
    handleAddToCart,
    handleQuantityChange,
    handleSkuChange,
  }
}
