import { router } from "expo-router"
import { ShoppingCart } from "lucide-react-native"
import { useState } from "react"
import { FlatList, Pressable, View } from "react-native"

import type { Product } from "@/core/catalog/entities"
import { useCatalogStore } from "@/ui/catalog/stores/catalog-store"
import { AppText } from "@/ui/shared/widgets/app-text"
import { CartDialog } from "@/ui/shared/widgets/cart-dialog"
import { ImageFallback } from "@/ui/shared/widgets/image-fallback"
import { Price } from "@/ui/shared/widgets/price"

interface ProductCardProps {
  readonly products: readonly Product[]
}

export const ProductCard = ({ products }: ProductCardProps) => {
  const setSelectedProduct = useCatalogStore((state) => state.setSelectedProduct)
  const [cartProduct, setCartProduct] = useState<Product>()
  const [isCartDialogOpen, setIsCartDialogOpen] = useState(false)

  return (
    <>
      <FlatList
        contentContainerClassName="gap-4 px-5"
        data={products}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const sku = item.skus[0]
          const discount =
            sku && sku.salePrice > sku.discountPrice
              ? Math.round((1 - sku.discountPrice / sku.salePrice) * 100)
              : 0
          return (
            <Pressable
              accessibilityLabel={`Ver ${item.name}`}
              accessibilityRole="button"
              className="w-56 gap-3 rounded-2xl border border-border bg-background p-3"
              onPress={() => {
                setSelectedProduct(item)
                router.push(`/(main)/(tabs)/catalog/${item.id}`)
              }}
            >
              <View className="relative">
                <ImageFallback className="h-48 w-full rounded-xl" source={item.imageUrl} />
                {discount ? (
                  <View className="absolute left-0 top-0 rounded-full bg-[#2F80FF] px-3 py-2">
                    <AppText className="font-bold text-primary-foreground">↓ {discount} %</AppText>
                  </View>
                ) : null}
                <Pressable
                  accessibilityLabel={`Adicionar ${item.name} ao carrinho`}
                  accessibilityRole="button"
                  className="absolute bottom-0 right-0 rounded-full bg-[#2F80FF] p-3"
                  disabled={!sku}
                  onPress={(event) => {
                    event.stopPropagation()
                    setCartProduct(item)
                    setIsCartDialogOpen(true)
                  }}
                >
                  <ShoppingCart color="#ffffff" size={22} />
                </Pressable>
              </View>
              <AppText className="text-sm text-[#2F80FF]">SKU: {item.skuCode}</AppText>
              <AppText className="text-lg text-muted-foreground">{item.brand?.name ?? ""}</AppText>
              <AppText className="min-h-6 text-xl font-bold">{item.name}</AppText>
              {sku ? <Price discountPrice={sku.discountPrice} salePrice={sku.salePrice} /> : null}
            </Pressable>
          )
        }}
        showsHorizontalScrollIndicator={false}
      />
      {cartProduct ? (
        <CartDialog
          isOpen={isCartDialogOpen}
          product={cartProduct}
          onClose={() => setIsCartDialogOpen(false)}
        />
      ) : null}
    </>
  )
}
