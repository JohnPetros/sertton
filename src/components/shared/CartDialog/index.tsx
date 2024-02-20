import { ReactNode, useRef } from 'react'
import { DialogClose, Text, View, XStack, YStack } from 'tamagui'

import { Dialog } from '../Dialog'
import { DialogRef } from '../Dialog/types/DialogRef'

import { useCartDialog } from './useCartDialog'

import { Button } from '@/components/shared/Button'
import { SkuSelectors } from '@/components/shared/SkuSelectors'
import { SkuSelectorsRef } from '../SkuSelectors/types/SkuSelectorsRef'

import type { Sku } from '@/@types/Sku'

import { SCREEN } from '@/utils/constants/screen'
import { NumberInput } from '../NumberInput'

type CartDialogProps = {
  children: ReactNode
  product: {
    id: string
    slug: string
    name: string
    skus: Sku[]
  }
}

export function CartDialog({ children, product }: CartDialogProps) {
  const quantity = useRef(1)
  const dialogRef = useRef<DialogRef | null>(null)
  const skuSelectsRef = useRef<SkuSelectorsRef | null>(null)

  const { handleAddCartItem, handleQuantityChange } = useCartDialog({
    productSlug: product.slug,
    skus: product.skus,
    quantity,
    dialogRef,
    skuSelectsRef,
  })

  return (
    <Dialog
      ref={dialogRef}
      title='Adicionar ao carrinho'
      width={SCREEN.width - SCREEN.paddingX * 2}
      content={
        <YStack mt={8}>
          <YStack
            borderRadius={4}
            borderWidth={1}
            borderColor='$gray100'
            justifyContent='center'
            p={24}
          >
            <Text color='$gray800' fontWeight='600' textAlign='center' fontSize={16}>
              {product.name}
            </Text>
            <YStack mt={12}>
              <SkuSelectors ref={skuSelectsRef} productId={product.id} />
            </YStack>

            <View mt={24}>
              <NumberInput
                label={`Quantidade do produto ${product.name}`}
                number={quantity.current}
                onChangeNumber={handleQuantityChange}
              />
            </View>
          </YStack>
          <XStack mt={24} gap={12} alignItems='center' justifyContent='space-between'>
            <DialogClose asChild>
              <Button background='secondary'>Cancelar</Button>
            </DialogClose>
            <Button onPress={handleAddCartItem}>Confirmar</Button>
          </XStack>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
