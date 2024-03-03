import { XStack, YStack } from 'tamagui'

import type { Sku } from '@/@types/Sku'

import {
  Discount,
  DiscountPrice,
  Name,
  SalePrice,
  SkuCode,
} from '@/components/shared/Product'
import { Skeleton } from '@/components/shared/Skeleton'

type InfoProps = {
  productName: string
  sku: Sku | null
  isLoading: boolean
}

export function ProductInfo({ productName, sku, isLoading }: InfoProps) {
  return (
    <>
      <Skeleton isVisible={isLoading} width={120} height={24}>
        {sku && <SkuCode fontSize={14}>{sku?.skuCode}</SkuCode>}
      </Skeleton>
      <Skeleton isVisible={isLoading} width={300} height={48}>
        {productName && <Name fontSize={24}>{productName}</Name>}
      </Skeleton>

      <Skeleton isVisible={isLoading} width={150} height={48}>
        {sku && (
          <XStack alignItems='flex-start' gap={12}>
            <YStack>
              <SalePrice fontSize={14} price={sku?.salePrice} />
              <DiscountPrice fontSize={24} price={sku?.discountPrice} />
            </YStack>
            <Discount salesPrice={sku?.salePrice} discountPrice={sku?.discountPrice} />
          </XStack>
        )}
      </Skeleton>
    </>
  )
}
