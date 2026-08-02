import { MoveDown, ShoppingCart } from "lucide-react-native"
import { type GestureResponderEvent, Pressable, View } from "react-native"

import type { Product } from "@/core/catalog/entities"
import { AppText } from "@/ui/shared/widgets/app-text"
import { CartDialog } from "@/ui/shared/widgets/cart-dialog"
import { ImageFallback } from "@/ui/shared/widgets/image-fallback"
import { Price } from "@/ui/shared/widgets/price"

import { useProductCard } from "./use-product-card"

interface ProductCardProps {
  readonly product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { closeCartDialog, isCartDialogOpen, openCartDialog, openProduct, sku } =
    useProductCard(product)
  const discount =
    sku && sku.salePrice > sku.discountPrice
      ? Math.round((1 - sku.discountPrice / sku.salePrice) * 100)
      : 0

  return (
    <Pressable
      accessibilityLabel={`Ver ${product.name}`}
      accessibilityRole="button"
      className="relative h-44 flex-row overflow-hidden rounded-[24px] border border-border bg-background"
      onPress={openProduct}
    >
      <View className="h-44 w-[36%] bg-muted/20 p-2">
        <ImageFallback className="h-full w-full" resizeMode="contain" source={product.imageUrl} />
        {discount ? (
          <View className="flex-row items-center gap-1 absolute left-0 top-3 rounded-r-full bg-[#287cff] px-2 py-1">
            <MoveDown color="#ffffff" size={12} />
            <AppText className="text-sm font-bold text-primary-foreground">{discount} %</AppText>
          </View>
        ) : null}
        <Pressable
          accessibilityLabel={`Adicionar ${product.name} ao carrinho`}
          accessibilityRole="button"
          className="absolute bottom-2 right-2 h-10 w-10 items-center justify-center rounded-full bg-[#287cff]"
          disabled={!sku}
          onPress={(event: GestureResponderEvent) => {
            event.stopPropagation()
            openCartDialog()
          }}
        >
          <ShoppingCart color="#ffffff" size={20} />
        </Pressable>
      </View>
      <View className="flex-1 justify-center gap-2 px-4 py-4">
        <AppText className="text-sm text-[#287cff]">SKU: {product.skuCode}</AppText>
        <AppText className="text-xs text-muted-foreground">{product.brand.name}</AppText>
        <AppText className="text-lg font-bold leading-5" numberOfLines={2}>
          {product.name}
        </AppText>
        {sku ? <Price discountPrice={sku.discountPrice} salePrice={sku.salePrice} /> : null}
      </View>
      <CartDialog isOpen={isCartDialogOpen} product={product} onClose={closeCartDialog} />
    </Pressable>
  )
}
