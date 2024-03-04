import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

import { CartProduct } from '@/@types/CartProduct'
// import { useAppError } from '@/components/shared/AppError/useAppError'
import { useApi } from '@/services/api'

export function useCartSummary(products: CartProduct[]) {
  const api = useApi()
  // const { throwAppError } = useAppError()

  const { data: discounts } = useQuery('discounts', () => api.getDiscounts(), {
    onError: (error) => {
      api.handleError(error)
      // throwAppError('Erro ao calcular desconto de compra')
    },
  })

  const [subtotalCost, setSubtotalCost] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [itemsCount, setTotalItems] = useState(0)

  function calculateTotalProductsCost() {
    return products.reduce((total, product) => {
      const selectedSku = product.skus.find(
        (sku) => sku.id === product.selectedSkuId
      )

      if (selectedSku)
        return total + selectedSku.salePrice * product.quantity


      if (!selectedSku)
        return total + product.skus[0].salePrice

      return total
    }, 0)
  }

  function calculateTotalProductsDiscount() {
    return products.reduce((total, product) => {
      const selectedSku = product.skus.find(
        (sku) => sku.id === product.selectedSkuId
      )

      if (selectedSku)
        return (
          total + (selectedSku.salePrice - selectedSku.discountPrice) * product.quantity
        )

      if (!selectedSku)
        return total + (product.skus[0].salePrice - product.skus[0].discountPrice) * product.quantity

      return total
    }, 0)
  }

  function calculateItemsCount() {
    return products.reduce((total, product) => {

      return product.quantity ? total + product.quantity : 0
    }, 0)
  }

  function calculateExtraDiscounts(totalProductsCost: number, totalProductsDiscount: number) {
    let totalDiscount = totalProductsDiscount

    const totalCost = totalProductsCost - totalProductsDiscount

    if (discounts) {
      for (const discount of discounts) {
        if (totalCost >= discount.minCost)
          totalDiscount = totalDiscount + totalCost * (discount.percent / 100)
      }
    }

    return totalDiscount
  }

  function setCartSummary() {
    const totalProductsCost = calculateTotalProductsCost()

    const totalProductsDiscount = calculateTotalProductsDiscount()

    const itemsCount = calculateItemsCount()

    const totalDiscount = calculateExtraDiscounts(totalProductsCost, totalProductsDiscount)

    setTotalDiscount(totalDiscount)
    setSubtotalCost(totalProductsCost)
    setTotalCost(totalProductsCost - totalDiscount)
    setTotalItems(itemsCount)
  }

  useEffect(() => {
    if (products?.length) setCartSummary()
  }, [products])

  return {
    subtotalCost,
    totalCost,
    totalDiscount,
    itemsCount,
    calculateTotalProductsCost,
    calculateTotalProductsDiscount,
    calculateItemsCount,
    calculateExtraDiscounts,
  }
}
