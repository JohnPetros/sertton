import { XStack, YStack, getTokens } from 'tamagui'
import { Trash } from 'phosphor-react-native'

import { AlertDialog } from '@/components/shared/AlertDialog'
import { Button } from '@/components/shared/Button'
import { List } from '@/components/shared/List'
import { NumberInput } from '@/components/shared/NumberInput'
import * as Product from '@/components/shared/Product'
import { Skeleton } from '@/components/shared/Skeleton'

import { useCartItem } from './useCartItem'
import { Sku } from '@/@types/Sku'
import { View } from 'tamagui'

const GAP = 12

type CartItemProps = {
  name: string
  imageUrl: string
  skus: Sku[]
  quantity: number
  selectedSkuId: string
  width: number
  isLoading: boolean
}

export function CartItem({
  name,
  skus,
  imageUrl,
  quantity,
  selectedSkuId,
  width,
  isLoading,
}: CartItemProps) {
  const { selectedSku, handleQuantityChange, handleRemoveItem, handleReachMaxInStock } =
    useCartItem(skus, selectedSkuId)

  const isSKeletonVisible = isLoading || !selectedSku

  const halfWidth = (width - GAP) / 2
  const hasVariations = Boolean(selectedSku?.variations.length)

  return (
    <XStack alignItems='center' justifyContent='center' gap={12}>
      <Skeleton width={halfWidth} height={180} isVisible={isSKeletonVisible}>
        <Product.Image url={imageUrl} size='medium' width={halfWidth - 24} height={160} />
      </Skeleton>

      <YStack width={halfWidth} gap={8}>
        {selectedSku && (
          <Skeleton isVisible={isSKeletonVisible}>
            <Product.SkuCode>{selectedSku.skuCode}</Product.SkuCode>
          </Skeleton>
        )}
        <Skeleton isVisible={isSKeletonVisible}>
          <Product.Name fontSize={14}>{name}</Product.Name>
        </Skeleton>

        <Skeleton isVisible={isSKeletonVisible} height={24} width={40}>
          {selectedSku && hasVariations && (
            <View testID="variations-id">
              <List
                bgColor='$gray50'
                items={selectedSku.variations.map(
                  (variation) => `${variation.name}: ${variation.value}`
                )}
              />
            </View>
          )}
        </Skeleton>

        <Skeleton height={40} isVisible={isSKeletonVisible}>
          <NumberInput
            label={`Quantidade do produto ${name}`}
            number={quantity}
            max={selectedSku?.stock}
            onChangeNumber={handleQuantityChange}
            onReachMax={handleReachMaxInStock}
          />
        </Skeleton>

        <Skeleton height={40} isVisible={isSKeletonVisible}>
          <XStack w={halfWidth} alignItems='center' justifyContent='space-between'>
            {selectedSku && (
              <YStack>
                <Product.SalePrice price={selectedSku.salePrice} />
                <Product.DiscountPrice price={selectedSku.discountPrice} />
              </YStack>
            )}
            <AlertDialog
              title='Deseja mesmo remover esse item do carrinho?'
              onConfirm={handleRemoveItem}
            >
              <Button background='secondary' w={24} h={24}>
                <Trash size={16} color={getTokens().color.white.val} />
              </Button>
            </AlertDialog>
          </XStack>
        </Skeleton>
      </YStack>
    </XStack>
  )
}
