import * as Linking from 'expo-linking'
import { useRouter } from 'expo-router'

import type { CartProduct } from '@/@types/CartProduct'
import type { ProcessedSku } from '@/@types/ProcessedSku'

import { useCartStore } from '@/stores/CartStore'

import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'

export function useCart() {
  const items = useCartStore((store) => store.state.items)
  const removeAllItems = useCartStore((store) => store.actions.removeAllItems)

  const api = useApi()

  const router = useRouter()

  async function getCartProducts() {
    const products: CartProduct[] = []

    for (const item of items) {
      const product = await api.getProductBySlug(item.slug)

      if (product)
        products.push({
          ...product,
          quantity: item.quantity,
          selectedSkuId: item.skuId,
        })
    }

    return products
  }

  const { data, error, isLoading, isFetching } = useCache(
    {
      key: 'cart-products',
      dependencies: [items],
      fetcher: getCartProducts,
    }
  )

  function handleRemoveAllItems() {
    removeAllItems()
  }

  function getSelectedSkus() {
    if (!data) return []

    const selectedSkus: ProcessedSku[] = []

    for (const product of data) {
      const selectedSku = product.skus.find(
        (sku) => sku.id === product.selectedSkuId
      )

      if (selectedSku)
        selectedSkus.push({
          quantity: product.quantity,
          ...selectedSku,
        })
    }

    return selectedSkus
  }

  function redirectToCheckout() {
    const skus = getSelectedSkus()

    if (!skus?.length) return

    const skusUri = skus
      .map((sku) => `${sku.yampiToken}:${sku.quantity}`)
      .join(',')

    const checkoutUrl = api.getCheckoutUrl()

    Linking.openURL(`${checkoutUrl}/${skusUri}`)

    router.push('/(stack)/(drawer)/(tabs)/home')
    removeAllItems()
  }

  return {
    products: data,
    totalCartItems: items.length,
    isLoading: isLoading || isFetching,
    getSelectedSkus,
    handleRemoveAllItems,
    redirectToCheckout,
  }
}
