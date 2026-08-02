import { Trash2 } from "lucide-react-native"
import { Pressable, View } from "react-native"

import { formatCurrency } from "@/core/shared/rules/formatters"
import { AppText } from "@/ui/shared/widgets/app-text"
import { ImageFallback } from "@/ui/shared/widgets/image-fallback"
import { QuantityInput } from "@/ui/shared/widgets/quantity-input"

interface CartItemCardProps {
  readonly discountPrice: number
  readonly imageUrl?: string
  readonly maxQuantity: number
  readonly name: string
  readonly onQuantityChange: (quantity: number) => void
  readonly onRemove: () => void
  readonly quantity: number
  readonly salePrice: number
  readonly skuCode: string
  readonly variation?: string
}

export const CartItemCard = ({
  discountPrice,
  imageUrl,
  maxQuantity,
  name,
  onQuantityChange,
  onRemove,
  quantity,
  salePrice,
  skuCode,
  variation,
}: CartItemCardProps) => {
  const currentPrice = discountPrice > 0 ? discountPrice : salePrice
  const hasDiscount = salePrice > currentPrice

  return (
    <View className="flex-row gap-4 rounded-3xl border border-border bg-background p-4">
      <ImageFallback
        className="h-28 w-28 rounded-xl bg-muted/20"
        resizeMode="contain"
        source={imageUrl}
      />
      <View className="min-w-0 flex-1 gap-2">
        <AppText className="text-sm font-semibold text-[#2D9CDB]">SKU: {skuCode}</AppText>
        <AppText className="text-lg font-bold leading-6" numberOfLines={2}>
          {name}
        </AppText>
        {variation ? (
          <AppText className="text-sm text-muted-foreground" numberOfLines={1}>
            • {variation}
          </AppText>
        ) : null}
        <View className="flex-row items-end justify-between gap-3 pt-1">
          <View className="gap-1">
            <QuantityInput
              max={Math.max(maxQuantity, 1)}
              value={quantity}
              onChange={onQuantityChange}
            />
            {hasDiscount ? (
              <AppText className="text-sm text-muted-foreground line-through">
                {formatCurrency(salePrice * quantity)}
              </AppText>
            ) : null}
            <AppText className="text-xl font-bold text-[#2D9CDB]">
              {formatCurrency(currentPrice * quantity)}
            </AppText>
          </View>
          <Pressable
            accessibilityLabel={`Remover ${name} do carrinho`}
            accessibilityRole="button"
            className="rounded-xl p-2"
            hitSlop={8}
            onPress={onRemove}
          >
            <Trash2 color="#8b8b96" size={24} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}
