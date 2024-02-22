import { Separator, XStack, YStack } from 'tamagui'

import { Skeleton } from '../Skeleton'

import { useCartSummary } from './useCartSummary'

import type { CartProduct } from '@/@types/CartProduct'

import { Summary } from '@/components/shared/Summary'
import { SCREEN } from '@/utils/constants/screen'

type CartSummaryProps = {
  items: CartProduct[]
  shipment?: number
  isLoading: boolean
}

export function CartSummary({ items, shipment = 0, isLoading }: CartSummaryProps) {
  const { subtotal, totalDiscount, totalItems, totalToPay } = useCartSummary(items)

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
      subtotal={subtotal}
      itemsAmount={totalItems}
      discount={totalDiscount}
      total={totalToPay + shipment}
      shipment={shipment}
    />
  )
}
