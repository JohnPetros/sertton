import { ShoppingCart } from 'phosphor-react-native'
import { getTokens } from 'tamagui'

import { CartDialog } from '../../CartDialog'

import type { Sku } from '@/@types/Sku'

import { Button } from '@/components/shared/Button'

type CartButtonProps = {
  product: {
    id: string
    slug: string
    name: string
    skus: Sku[]
  }
}

export function CartButton({ product }: CartButtonProps) {
  return (
    <CartDialog product={product}>
      <Button w={12} h={24} icon={<ShoppingCart color={getTokens().color.white.val} />} />
    </CartDialog>
  )
}
