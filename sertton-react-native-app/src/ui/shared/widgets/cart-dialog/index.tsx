import { ShoppingCart, X } from "lucide-react-native"
import { useEffect, useMemo, useState } from "react"
import { Pressable, View } from "react-native"

import type { Product, Sku } from "@/core/catalog/entities"
import { SkuSelector } from "@/ui/catalog/widgets/screens/product/sku-selector"
import { useCartStore } from "@/ui/checkout/stores/cart-store"

import { AnimatedModal } from "../animated-modal"
import { AppText } from "../app-text"

interface CartDialogProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly product: Product
}

export const CartDialog = ({ isOpen, onClose, product }: CartDialogProps) => {
  const addItem = useCartStore((state) => state.addItem)
  const [selectedSku, setSelectedSku] = useState<Sku | undefined>(product.skus[0])
  const [quantity, setQuantity] = useState(1)
  const variationLabel = useMemo(
    () => product.skus[0]?.variations[0]?.name ?? "Variação",
    [product.skus],
  )
  const canAddToCart = Boolean(selectedSku && selectedSku.stock > 0)

  useEffect(() => {
    if (!isOpen) return
    setSelectedSku(product.skus[0])
    setQuantity(1)
  }, [isOpen, product])

  const selectSku = (sku: Sku) => {
    setSelectedSku(sku)
    setQuantity(1)
  }

  const changeQuantity = (value: number) => {
    const maxQuantity = Math.max(selectedSku?.stock ?? 1, 1)
    setQuantity(Math.min(Math.max(value, 1), maxQuantity))
  }

  const addToCart = () => {
    if (!selectedSku || selectedSku.stock <= 0) return
    addItem({ product, productId: product.id, quantity, skuId: selectedSku.id })
    onClose()
  }

  return (
    <AnimatedModal
      backdropClassName="items-center justify-center px-4"
      backdropStyle={{ backgroundColor: "rgba(15, 23, 42, 0.64)" }}
      contentClassName="max-h-[85%] w-full max-w-md rounded-[28px] bg-background p-5"
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View className="mb-5 flex-row items-start justify-between gap-4">
        <View className="flex-1 gap-1">
          <AppText className="text-xs font-bold tracking-widest text-[#287cff]">
            ADICIONAR AO CARRINHO
          </AppText>
          <AppText className="text-xl font-extrabold" numberOfLines={2}>
            {product.name}
          </AppText>
        </View>
        <Pressable
          accessibilityLabel="Fechar carrinho"
          accessibilityRole="button"
          className="h-10 w-10 items-center justify-center rounded-full bg-muted"
          onPress={onClose}
        >
          <X color="#27272a" size={21} strokeWidth={2.5} />
        </Pressable>
      </View>
      <SkuSelector
        label={variationLabel}
        quantity={quantity}
        selectedSku={selectedSku}
        skus={product.skus}
        onQuantityChange={changeQuantity}
        onSkuSelected={selectSku}
      />
      <Pressable
        accessibilityLabel="Adicionar produto ao carrinho"
        accessibilityRole="button"
        className="mt-6 flex-row items-center justify-center gap-2 rounded-xl bg-[#287cff] p-4 disabled:bg-muted"
        disabled={!canAddToCart}
        onPress={addToCart}
      >
        <ShoppingCart color={canAddToCart ? "#ffffff" : "#71717a"} size={20} />
        <AppText
          className={`text-center text-base font-bold ${canAddToCart ? "text-primary-foreground" : "text-muted-foreground"}`}
        >
          {canAddToCart ? "Adicionar ao carrinho" : "Produto indisponível"}
        </AppText>
      </Pressable>
    </AnimatedModal>
  )
}
