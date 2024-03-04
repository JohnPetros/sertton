import { Separator, XStack, YStack } from 'tamagui'

import { Skeleton } from '../Skeleton'

import { useCartSummary } from './useCartSummary'

import type { CartProduct } from '@/@types/CartProduct'

import { Summary } from '@/components/shared/Summary'

type CartSummaryProps = {
  items: CartProduct[]
  shipmentCost?: number
  isLoading: boolean
}

export function CartSummary({ items, shipmentCost = 0, isLoading }: CartSummaryProps) {
  const { subtotalCost, totalDiscount, itemsCount, totalCost } = useCartSummary(items)

  if (isLoading)
    return (
      <YStack gap={12}>
        <XStack justifyContent='space-between'>
          <Skeleton isVisible={true} height={20} width={120} />
          <Skeleton isVisible={true} height={20} width={120} />
        </XStack>
        <Separator alignSelf='stretch' bg='$gray400' />
        <XStack justifyContent='space-between'>
          <Skeleton isVisible={true} height={20} width={120} />
          <Skeleton isVisible={true} height={20} width={120} />
        </XStack>
        <Separator alignSelf='stretch' bg='$gray400' />
        <XStack justifyContent='space-between'>
          <Skeleton isVisible={true} height={20} width={120} />
          <Skeleton isVisible={true} height={20} width={120} />
        </XStack>
      </YStack>
    )

  return (
    <Summary
      subtotal={subtotalCost}
      itemsCount={itemsCount}
      discount={totalDiscount}
      total={totalCost + shipmentCost}
      shipmentCost={shipmentCost}
    />
  )
}
