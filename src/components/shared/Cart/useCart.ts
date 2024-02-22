import { Linking } from 'react-native'

import type { CartProduct } from '@/@types/CartProduct'

import { useCartStore } from '@/stores/CartStore'

import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'

const YAMPI_PURCHASE_URL = process.env.YAMPI_PURCHASE_URL

export function useCart() {
  const items = useCartStore((store) => store.state.items)
  const removeAllItems = useCartStore((store) => store.actions.removeAllItems)

  const api = useApi()

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
    if (!data) return

    const selectedSkus = []

    for (const product of data) {
      const selectedSku = product.skus.find(
        (sku) => sku.id === product.selectedSkuId
      )

      if (selectedSku)
        selectedSkus.push({
          quantity: product.quantity,
          name: product.name,
          ...selectedSku,
        })
    }

    return selectedSkus
  }

  function redirectToCheckout() {
    const skus = getSelectedSkus()

    if (!skus?.length || !YAMPI_PURCHASE_URL) return

    const skusUri = skus
      .map((sku) => `${sku.yampiToken}:${sku.quantity}`)
      .join(',')

    Linking.openURL(`${YAMPI_PURCHASE_URL}/${skusUri}`)
  }

  return {
    products: data,
    totalCartItems: items.length,
    error,
    isLoading: isLoading || isFetching,
    getSelectedSkus,
    handleRemoveAllItems,
    redirectToCheckout,
  }
}
