import { Pressable, View } from "react-native"

import { formatCurrency } from "@/core/shared/rules/formatters"
import { AppText } from "@/ui/shared/widgets/app-text"

interface CartSummaryProps {
  readonly discount: number
  readonly isCheckoutEnabled: boolean
  readonly isCheckingOut: boolean
  readonly itemCount: number
  readonly onCheckout: () => void
  readonly subtotal: number
  readonly total: number
}

export const CartSummary = ({
  discount,
  isCheckoutEnabled,
  isCheckingOut,
  itemCount,
  onCheckout,
  subtotal,
  total,
}: CartSummaryProps) => {
  return (
    <View className="border-t border-border bg-background px-5 pb-5 pt-4">
      <View className="gap-3">
        <View className="flex-row justify-between">
          <AppText>
            Produtos ({itemCount} {itemCount === 1 ? "item" : "itens"})
          </AppText>
          <AppText>{formatCurrency(subtotal)}</AppText>
        </View>
        {discount > 0 ? (
          <View className="flex-row justify-between">
            <AppText className="text-[#27AE60]">Desconto</AppText>
            <AppText className="text-[#27AE60]">- {formatCurrency(discount)}</AppText>
          </View>
        ) : null}
        <View className="flex-row justify-between pt-1">
          <AppText className="text-2xl font-bold">Total</AppText>
          <AppText className="text-2xl font-bold">{formatCurrency(total)}</AppText>
        </View>
      </View>
      <Pressable
        accessibilityLabel="Finalizar compra"
        accessibilityRole="button"
        accessibilityState={{ disabled: !isCheckoutEnabled }}
        className="mt-5 items-center rounded-xl bg-[#2F80FF] py-4 disabled:bg-[#85858f]"
        disabled={!isCheckoutEnabled}
        onPress={onCheckout}
      >
        <AppText className="text-xl font-bold text-primary-foreground">
          {isCheckingOut ? "Abrindo checkout..." : "Finalizar compra"}
        </AppText>
      </Pressable>
    </View>
  )
}
