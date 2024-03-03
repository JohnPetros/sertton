import { AllRoutes, Link } from 'expo-router'
import { memo } from 'react'
import { View, XStack, YStack } from 'tamagui'

import * as Product from '../Product'

import type { Product as ProductData } from '@/@types/Product'
import { Skeleton } from '@/components/shared/Skeleton'

export type ProductItemProps = {
  data: ProductData
  isLoading: boolean
  isColumn?: boolean
  width: number
}

const ProductItemComponent = ({
  data: { skus, imageUrl, name, brand, slug, id, skuCode },
  isLoading,
  isColumn = true,
  width = 150,
}: ProductItemProps) => {
  return (
    <Link href={`/(stack)/(drawer)/(tabs)/${slug}`} asChild>
      <View
        w={width}
        flexDirection={isColumn ? 'column' : 'row'}
        alignItems='center'
        gap={12}
        pressStyle={{ backgroundColor: '$gray100' }}
      >
        <View position='relative'>
          {!isLoading && (
            <>
              <View position='absolute' top={8} left={8} zIndex={50}>
                <Product.Discount
                  discountPrice={skus[0].discountPrice}
                  salesPrice={skus[0].salePrice}
                />
              </View>
              <View position='absolute' bottom={8} right={8} zIndex={50}>
                <Product.CartButton product={{ id, slug, name, skus }} />
              </View>
            </>
          )}

          <Skeleton width={width} height={180} isVisible={isLoading}>
            {imageUrl && (
              <Product.Image
                url={imageUrl}
                size='medium'
                width={!isColumn ? width / 2 : width}
                height={180}
              />
            )}
          </Skeleton>
        </View>
        <YStack flexShrink={1} width={!isColumn ? width / 2 : width} gap={4}>
          {skuCode && (
            <Skeleton width={44} height={12} isVisible={isLoading}>
              <Product.SkuCode>{skuCode}</Product.SkuCode>
            </Skeleton>
          )}
          {brand?.name && (
            <Skeleton width={44} height={12} isVisible={isLoading}>
              <Product.Brand>{brand.name}</Product.Brand>
            </Skeleton>
          )}
          <Skeleton width={80} height={24} isVisible={isLoading}>
            <Product.Name>{name}</Product.Name>
          </Skeleton>
          <XStack justifyContent='space-between'>
            {!isLoading && (
              <>
                <Product.DiscountPrice price={skus[0].discountPrice} />
                <Product.SalePrice price={skus[0].salePrice} />
              </>
            )}
          </XStack>
        </YStack>
      </View>
    </Link>
  )
}

export const ProductItem = memo(ProductItemComponent, (previusProps, currentProps) => {
  return previusProps.isLoading === currentProps.isLoading
})
