import { useEffect, useState } from 'react'

import { ProcessedOrder } from '@/@types/ProcessedOrder'

export function useOrderItem({ products }: Pick<ProcessedOrder, 'products'>) {
  const [totalDiscount, setTotalDiscount] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [skusAmount, setSkusAmount] = useState(0)

  function calculateTotalDiscount() {
    const totalDiscount = products.reduce((total, item) => {
      return (
        total + (item.sku.salePrice - item.sku.discountPrice) * item.quantity
      )
    }, 0)

    const subtotal = products.reduce((total, item) => {
      return total + item.sku.salePrice * item.quantity
    }, 0)

    const skusAmount = products.reduce((total, item) => {
      return total + item.quantity
    }, 0)

    setTotalDiscount(totalDiscount)
    setSubtotal(subtotal)
    setSkusAmount(skusAmount)
  }

  useEffect(() => {
    calculateTotalDiscount()
  }, [])

  return {
    subtotal,
    totalDiscount,
    skusAmount,
  }
}
