import { Separator, XStack, YStack } from 'tamagui'
import { Text } from 'tamagui'

import { Heading } from './Heading'

import { ProcessedOrder } from '@/@types/ProcessedOrder'
import * as Product from '@/components/shared/Product'
import { Summary } from '@/components/shared/Summary'
import { SCREEN } from '@/utils/constants/screen'

type ProductsProps = {
  subtotal: number
  discount: number
  shipment: number
  total: number
  itemsAmount: number
  products: Pick<ProcessedOrder, 'products'>
}

export function Products({
  discount,
  itemsAmount,
  shipment,
  subtotal,
  total,
  products: { products },
}: ProductsProps) {
  return (
    <YStack>
      <Heading>Produtos</Heading>
      <YStack gap={24} mt={8} separator={<Separator bg='$gray500' />}>
        {products.map((product) => (
          <XStack key={product.id} justifyContent='space-between'>
            <YStack gap={8} w={SCREEN.width - SCREEN.paddingX * 2 - 100}>
              <Product.SkuCode>{product.sku.skuCode}</Product.SkuCode>
              <Product.Name>{product.sku.name}</Product.Name>
              <XStack gap={8}>
                <Product.SalePrice price={product.sku.salePrice} />
                <Product.DiscountPrice price={product.sku.discountPrice} />
              </XStack>
            </YStack>
            <Text color='$gray600'>qtd.: {product.quantity}</Text>
          </XStack>
        ))}
      </YStack>
      <Separator mt={12} mb={8} bg='$gray500' />
      <Summary
        subtotal={subtotal}
        discount={discount}
        shipment={shipment}
        total={total}
        itemsAmount={itemsAmount}
      />
    </YStack>
  )
}
