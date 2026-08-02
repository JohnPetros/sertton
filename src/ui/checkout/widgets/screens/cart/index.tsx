import { Trash2 } from "lucide-react-native"
import { Pressable, ScrollView, View } from "react-native"

import { AppHeader } from "@/ui/shared/widgets/app-header"
import { AppText } from "@/ui/shared/widgets/app-text"
import { ErrorState } from "@/ui/shared/widgets/error-state"

import { CartEmptyState } from "./cart-empty-state"
import { CartItemCard } from "./cart-item-card"
import { CartItemCardSkeleton } from "./cart-item-card/skeleton"
import { CartSummary } from "./cart-summary"
import { useCartScreen } from "./use-cart-screen"

export const CartScreen = () => {
  const {
    canCheckout,
    checkout,
    clear,
    displayItems,
    error,
    isCheckingOut,
    isHydrated,
    isLoading,
    itemCount,
    loadCartProducts,
    removeItem,
    setQuantity,
    totals,
  } = useCartScreen()

  if (!isHydrated)
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <AppText>Carregando carrinho...</AppText>
      </View>
    )

  const isEmpty = itemCount === 0

  return (
    <View className="flex-1 bg-background">
      <AppHeader showSearch />
      {isEmpty ? (
        <CartEmptyState />
      ) : (
        <ScrollView
          contentContainerClassName="gap-4 px-4 pb-6 pt-5"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-row items-center gap-3">
            <AppText className="flex-1 text-3xl font-bold" numberOfLines={1}>
              Meu Carrinho
            </AppText>
            <Pressable
              accessibilityLabel="Limpar carrinho"
              accessibilityRole="button"
              className="flex-row items-center gap-2 rounded-xl px-2 py-2"
              onPress={clear}
            >
              <Trash2 color="#27272a" size={21} />
              <AppText className="font-semibold">Limpar carrinho</AppText>
            </Pressable>
          </View>
          {isLoading
            ? ["one", "two"].map((key) => <CartItemCardSkeleton key={key} />)
            : displayItems.map((item) => (
                <CartItemCard
                  key={item.sku.id}
                  discountPrice={item.sku.discountPrice}
                  imageUrl={item.imageUrl}
                  maxQuantity={item.sku.stock}
                  name={item.name}
                  quantity={item.quantity}
                  salePrice={item.sku.salePrice}
                  skuCode={item.sku.skuCode}
                  variation={item.variation}
                  onQuantityChange={(quantity) => setQuantity(item.sku.id, quantity)}
                  onRemove={() => removeItem(item.sku.id)}
                />
              ))}
          {error ? <ErrorState message={error} onRetry={loadCartProducts} /> : null}
        </ScrollView>
      )}
      <CartSummary
        discount={totals.discount}
        isCheckoutEnabled={canCheckout}
        isCheckingOut={isCheckingOut}
        itemCount={itemCount}
        subtotal={totals.subtotal}
        total={totals.total}
        onCheckout={checkout}
      />
    </View>
  )
}
