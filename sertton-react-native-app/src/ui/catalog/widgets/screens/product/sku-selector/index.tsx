import { Check, ChevronDown, Minus, Plus, X } from "lucide-react-native"
import { Pressable, ScrollView, View } from "react-native"

import type { Sku } from "@/core/catalog/entities"
import { AnimatedModal } from "@/ui/shared/widgets/animated-modal"
import { AppText } from "@/ui/shared/widgets/app-text"

import { useSkuSelector } from "./use-sku-selector"

interface SkuSelectorProps {
  readonly label: string
  readonly quantity: number
  readonly selectedSku: Sku | undefined
  readonly skus: readonly Sku[]
  readonly onQuantityChange: (quantity: number) => void
  readonly onSkuSelected: (sku: Sku) => void
}

export const SkuSelector = ({
  label,
  quantity,
  selectedSku,
  skus,
  onQuantityChange,
  onSkuSelected,
}: SkuSelectorProps) => {
  const { closeOptions, isOptionsOpen, openOptions, options, selectSku, selectedLabel } =
    useSkuSelector(skus, selectedSku, onSkuSelected)
  const maxQuantity = Math.max(selectedSku?.stock ?? 1, 1)

  return (
    <View className="gap-6">
      <View className="items-center gap-3">
        <AppText className="text-sm font-bold tracking-wider text-muted-foreground">
          {label.toUpperCase()}
        </AppText>
        <Pressable
          accessibilityLabel={`Selecionar ${label}`}
          accessibilityRole="button"
          className="w-full flex-row items-center justify-between rounded-xl border border-border bg-background px-5 py-5"
          onPress={openOptions}
        >
          <AppText className="font-semibold">{selectedLabel ?? "Selecionar"}</AppText>
          <ChevronDown color="#71717a" size={20} />
        </Pressable>
      </View>
      <View className="items-center gap-4">
        <View className="flex-row items-center gap-7">
          <Pressable
            accessibilityLabel="Diminuir quantidade"
            accessibilityRole="button"
            accessibilityState={{ disabled: quantity <= 1 }}
            className="h-14 w-14 items-center justify-center rounded-xl border border-[#287cff] bg-background disabled:opacity-40"
            disabled={quantity <= 1}
            onPress={() => onQuantityChange(quantity - 1)}
          >
            <Minus color="#287cff" size={24} strokeWidth={2.5} />
          </Pressable>
          <AppText
            accessibilityLabel={`Quantidade: ${quantity}`}
            className="min-w-10 text-center text-2xl font-extrabold"
          >
            {quantity}
          </AppText>
          <Pressable
            accessibilityLabel="Aumentar quantidade"
            accessibilityRole="button"
            accessibilityState={{ disabled: quantity >= maxQuantity }}
            className="h-14 w-14 items-center justify-center rounded-xl bg-[#287cff] disabled:opacity-40"
            disabled={quantity >= maxQuantity}
            onPress={() => onQuantityChange(quantity + 1)}
          >
            <Plus color="#ffffff" size={24} strokeWidth={2.5} />
          </Pressable>
        </View>
        {selectedSku?.stock !== undefined ? (
          <AppText className="text-base text-muted-foreground">
            {selectedSku.stock > 0
              ? `Disponível: ${selectedSku.stock} unidades`
              : "Produto indisponível"}
          </AppText>
        ) : null}
      </View>
      <AnimatedModal
        backdropClassName="items-center justify-center px-4"
        backdropStyle={{ backgroundColor: "rgba(15, 23, 42, 0.64)" }}
        contentClassName="max-h-[70%] w-full max-w-md rounded-[28px] border border-white/20 bg-background px-5 pb-5 pt-4 shadow-xl"
        visible={isOptionsOpen}
        onRequestClose={closeOptions}
      >
        <View className="mb-5 flex-row items-center justify-between gap-4">
          <View className="flex-1 gap-1">
            <AppText className="text-xl font-extrabold">Selecione o {label.toUpperCase()}</AppText>
          </View>
          <Pressable
            accessibilityLabel="Fechar opções"
            accessibilityRole="button"
            className="h-10 w-10 items-center justify-center rounded-full bg-muted"
            onPress={closeOptions}
          >
            <X color="#27272a" size={21} strokeWidth={2.5} />
          </Pressable>
        </View>
        <ScrollView contentContainerClassName="gap-3 pb-1" showsVerticalScrollIndicator={false}>
          {options.map(({ label: optionLabel, sku }) => {
            const isSelected = selectedSku?.id === sku.id
            return (
              <Pressable
                key={sku.id}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                className={`min-h-20 flex-row items-center justify-between rounded-2xl border px-4 py-4 ${isSelected ? "border-[#287cff] bg-[#287cff]" : "border-border bg-muted/40"}`}
                onPress={() => selectSku(sku)}
              >
                <View className="flex-1 gap-1.5 pr-3">
                  <AppText className={`font-bold ${isSelected ? "text-white" : "text-foreground"}`}>
                    {optionLabel}
                  </AppText>
                  <AppText className={isSelected ? "text-blue-100" : "text-muted-foreground"}>
                    {sku.stock > 0 ? `${sku.stock} em estoque` : "Indisponível"}
                  </AppText>
                </View>
                <View
                  className={`h-8 w-8 items-center justify-center rounded-full border ${isSelected ? "border-white/30 bg-white/20" : "border-border bg-background"}`}
                >
                  {isSelected ? <Check color="#ffffff" size={18} strokeWidth={3} /> : null}
                </View>
              </Pressable>
            )
          })}
        </ScrollView>
      </AnimatedModal>
    </View>
  )
}
