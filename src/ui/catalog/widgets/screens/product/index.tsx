import { useLocalSearchParams } from "expo-router"
import { ArrowLeft, ShoppingCart, Trash2 } from "lucide-react-native"
import { Pressable, ScrollView, View } from "react-native"

import { InstallmentsDialog } from "@/ui/catalog/widgets/screens/product/installments-dialog"
import { ProductDescription } from "@/ui/catalog/widgets/screens/product/product-description"
import { ProductHeader } from "@/ui/catalog/widgets/screens/product/product-header"
import { ProductImageViewer } from "@/ui/catalog/widgets/screens/product/product-image-viewer"
import { ProductPricing } from "@/ui/catalog/widgets/screens/product/product-pricing"
import { ShortageTimeCounter } from "@/ui/catalog/widgets/screens/product/shortage-time-counter"
import { SimilarProducts } from "@/ui/catalog/widgets/screens/product/similar-products"
import { SkuSelector } from "@/ui/catalog/widgets/screens/product/sku-selector"
import { AppHeader } from "@/ui/shared/widgets/app-header"
import { AppText } from "@/ui/shared/widgets/app-text"
import { ErrorState } from "@/ui/shared/widgets/error-state"

import { useProductScreen } from "./use-product-screen"

export const ProductScreen = () => {
  const { productId } = useLocalSearchParams<{ productId: string }>()
  const {
    addToCart,
    canAddToCart,
    cartQuantity,
    changeQuantity,
    closeInstallments,
    error,
    goBack,
    isInstallmentsOpen,
    isLoading,
    openInstallments,
    product,
    quantity,
    removeFromCart,
    selectedSku,
    selectSku,
    variationLabel,
  } = useProductScreen(productId)

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <AppText>Carregando produto...</AppText>
      </View>
    )

  if (error || !product) return <ErrorState message={error} />

  return (
    <View className="flex-1 bg-background">
      <AppHeader showSearch />
      <ScrollView contentContainerClassName="gap-6 pb-10">
        <View className="gap-6 px-5 pt-5">
          <Pressable
            accessibilityLabel="Voltar ao catálogo"
            accessibilityRole="button"
            className="flex-row self-start items-center gap-2"
            onPress={goBack}
          >
            <ArrowLeft color="#287cff" size={20} strokeWidth={2.5} />
            <AppText className="font-bold text-[#287cff]">Voltar ao catálogo</AppText>
          </Pressable>
          <ProductImageViewer
            imageUrl={selectedSku?.imageUrl || product.imageUrl}
            productName={product.name}
          />
          <ProductHeader skuCode={selectedSku?.skuCode ?? product.skuCode} title={product.name} />
          {selectedSku ? (
            <ProductPricing
              discountPrice={selectedSku.discountPrice}
              salePrice={selectedSku.salePrice}
              onShowInstallments={openInstallments}
            />
          ) : null}
          <SkuSelector
            label={variationLabel}
            quantity={quantity}
            selectedSku={selectedSku}
            skus={product.skus}
            onQuantityChange={changeQuantity}
            onSkuSelected={selectSku}
          />
          {selectedSku ? <ShortageTimeCounter stock={selectedSku.stock} /> : null}
          {cartQuantity > 0 ? (
            <View className="gap-3 rounded-2xl border border-[#b9d6ff] bg-[#eff6ff] p-4">
              <View className="flex-row items-center gap-3">
                <View className="rounded-full bg-[#287cff] p-2">
                  <ShoppingCart color="#ffffff" size={18} />
                </View>
                <View className="flex-1">
                  <AppText className="font-bold text-[#1f3f72]">Item no carrinho</AppText>
                  <AppText className="text-sm text-[#46658f]">
                    {cartQuantity}{" "}
                    {cartQuantity === 1 ? "unidade adicionada" : "unidades adicionadas"}
                  </AppText>
                </View>
              </View>
              <Pressable
                accessibilityLabel="Remover do carrinho"
                accessibilityRole="button"
                className="flex-row items-center justify-center gap-2 rounded-xl border border-[#b9d6ff] bg-background p-3"
                onPress={removeFromCart}
              >
                <Trash2 color="#287cff" size={18} />
                <AppText className="font-bold text-[#287cff]">Remover do carrinho</AppText>
              </Pressable>
            </View>
          ) : null}
          <Pressable
            accessibilityLabel="Adicionar ao carrinho"
            accessibilityRole="button"
            className="rounded-xl bg-[#287cff] p-4 disabled:bg-muted"
            disabled={!canAddToCart}
            onPress={addToCart}
          >
            <AppText className="text-center text-lg font-bold text-primary-foreground">
              {canAddToCart ? "Adicionar ao carrinho" : "Produto indisponível"}
            </AppText>
          </Pressable>
          <ProductDescription
            description={product.description}
            specifications={product.specifications}
          />
        </View>
        <SimilarProducts productId={product.id} />
      </ScrollView>
      {selectedSku ? (
        <InstallmentsDialog
          isOpen={isInstallmentsOpen}
          productId={product.id}
          productPrice={
            selectedSku.discountPrice > 0 ? selectedSku.discountPrice : selectedSku.salePrice
          }
          onClose={closeInstallments}
        />
      ) : null}
    </View>
  )
}
