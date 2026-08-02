import { Pressable, View } from "react-native"

import { formatCurrency } from "@/core/shared/rules/formatters"
import { DiscountBadge } from "@/ui/catalog/widgets/components/discount-badge"
import { AppText } from "@/ui/shared/widgets/app-text"

interface ProductPricingProps {
  readonly discountPrice: number
  readonly salePrice: number
  readonly onShowInstallments: () => void
}

export const ProductPricing = ({
  discountPrice,
  salePrice,
  onShowInstallments,
}: ProductPricingProps) => {
  const hasDiscount = discountPrice > 0 && discountPrice < salePrice
  const currentPrice = hasDiscount ? discountPrice : salePrice
  const discount = hasDiscount ? Math.round((1 - discountPrice / salePrice) * 100) : 0

  return (
    <View className="gap-2">
      {hasDiscount ? (
        <View className="flex-row items-center gap-3">
          <AppText className="text-base text-muted-foreground line-through">
            {formatCurrency(salePrice)}
          </AppText>
          <DiscountBadge discount={discount} />
        </View>
      ) : null}
      <AppText className="text-4xl font-extrabold text-[#287cff]">
        {formatCurrency(currentPrice)}
      </AppText>
      <Pressable accessibilityRole="button" onPress={onShowInstallments}>
        <AppText className="font-semibold text-[#287cff] underline">
          Ver opções de parcelamento
        </AppText>
      </Pressable>
    </View>
  )
}
