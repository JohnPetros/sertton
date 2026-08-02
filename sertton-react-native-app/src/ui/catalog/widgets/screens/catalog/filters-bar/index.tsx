import { Building2, Check, ListFilter, Trash2, X } from "lucide-react-native"
import { Pressable, ScrollView, View } from "react-native"

import type { Brand, Category } from "@/core/catalog/entities"
import { AnimatedModal } from "@/ui/shared/widgets/animated-modal"
import { AppText } from "@/ui/shared/widgets/app-text"
import { Skeleton } from "@/ui/shared/widgets/skeleton"

import { useFiltersBar } from "./use-filters-bar"

interface FiltersBarProps {
  readonly brands: readonly Brand[]
  readonly brandsIds: readonly string[]
  readonly categories: readonly Category[]
  readonly categoryId?: string
  readonly onBrandsChange: (ids: readonly string[]) => void
  readonly onCategoryChange: (id: string | undefined) => void
  readonly isLoading?: boolean
}

const stripHtml = (value: string): string => value.replace(/<[^>]*>/g, "")

export const FiltersBar = ({
  brands,
  brandsIds,
  categories,
  categoryId,
  onBrandsChange,
  onCategoryChange,
  isLoading = false,
}: FiltersBarProps) => {
  const {
    closeBrandsModal,
    closeCategoriesModal,
    isBrandsModalVisible,
    isCategoriesModalVisible,
    openBrandsModal,
    openCategoriesModal,
  } = useFiltersBar()

  if (isLoading) {
    return (
      <View className="flex-row gap-3 px-4 pb-5 pt-2">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </View>
    )
  }

  const selectedCategory = categories.find((category) => category.id === categoryId)
  const hasFilters = categoryId !== undefined || brandsIds.length > 0

  return (
    <View className="gap-3 px-4 pb-5 pt-2">
      <View className="flex-row gap-3">
        <Pressable
          className="h-10 flex-1 items-center justify-center overflow-hidden rounded-xl border border-border bg-background"
          onPress={openCategoriesModal}
        >
          <View className="flex-row items-center gap-2 px-3" style={{ flexShrink: 1 }}>
            <ListFilter color="#171717" size={18} />
            <AppText className="font-bold" numberOfLines={1} style={{ flexShrink: 1 }}>
              {selectedCategory?.name ?? "Categoria"}
            </AppText>
          </View>
        </Pressable>
        <Pressable
          className="h-10 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-border bg-background"
          onPress={openBrandsModal}
        >
          <Building2 color="#171717" size={18} />
          <AppText className="font-bold">
            {brandsIds.length ? `Marcas (${brandsIds.length})` : "Marcas"}
          </AppText>
        </Pressable>
        {hasFilters ? (
          <Pressable
            className="h-10 w-10 items-center justify-center rounded-xl border border-border"
            onPress={() => {
              onCategoryChange(undefined)
              onBrandsChange([])
            }}
          >
            <Trash2 color="#287cff" size={20} />
          </Pressable>
        ) : null}
      </View>

      <AnimatedModal
        backdropClassName="justify-center px-5"
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        contentClassName="max-h-[80%] gap-4 rounded-3xl bg-background p-5"
        visible={isCategoriesModalVisible}
        onRequestClose={closeCategoriesModal}
      >
        <View className="flex-row items-center justify-between">
          <AppText className="text-3xl font-bold">Categorias</AppText>
          <Pressable onPress={closeCategoriesModal}>
            <X size={24} />
          </Pressable>
        </View>
        <ScrollView contentContainerClassName="gap-3">
          <Pressable
            className={`rounded-2xl border p-4 ${categoryId === undefined ? "border-[#287cff] bg-blue-50" : "border-border"}`}
            onPress={() => {
              onCategoryChange(undefined)
              closeCategoriesModal()
            }}
          >
            <AppText className="font-bold">✓ Todas as categorias</AppText>
          </Pressable>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              className={`gap-1 rounded-2xl border p-4 ${categoryId === category.id ? "border-[#287cff] bg-blue-50" : "border-border"}`}
              onPress={() => {
                onCategoryChange(category.id)
                closeCategoriesModal()
              }}
            >
              <AppText className="font-semibold">{category.name}</AppText>
              {category.description ? (
                <AppText className="text-sm text-muted-foreground">
                  {stripHtml(category.description)}
                </AppText>
              ) : null}
            </Pressable>
          ))}
        </ScrollView>
        <Pressable
          className="self-end rounded-xl border border-border px-5 py-3"
          onPress={closeCategoriesModal}
        >
          <AppText className="font-bold">Cancelar</AppText>
        </Pressable>
      </AnimatedModal>

      <AnimatedModal
        backdropClassName="justify-center px-5"
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        contentClassName="max-h-[80%] gap-4 rounded-3xl bg-background p-5"
        visible={isBrandsModalVisible}
        onRequestClose={closeBrandsModal}
      >
        <View className="flex-row items-center justify-between">
          <AppText className="text-3xl font-bold">Filtrar por marcas</AppText>
          <Pressable onPress={closeBrandsModal}>
            <X size={24} />
          </Pressable>
        </View>
        <ScrollView contentContainerClassName="gap-3">
          {brands.map((brand) => {
            const isSelected = brandsIds.includes(brand.id)
            return (
              <Pressable
                key={brand.id}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isSelected }}
                className="flex-row items-center gap-3 rounded-xl py-2"
                onPress={() =>
                  onBrandsChange(
                    isSelected
                      ? brandsIds.filter((id) => id !== brand.id)
                      : [...brandsIds, brand.id],
                  )
                }
              >
                <View
                  className={`h-5 w-5 items-center justify-center rounded-md border ${isSelected ? "border-[#287cff] bg-[#287cff]" : "border-[#94a3b8] bg-background"}`}
                >
                  {isSelected ? <Check color="#ffffff" size={14} strokeWidth={3} /> : null}
                </View>
                <AppText>{brand.name}</AppText>
              </Pressable>
            )
          })}
        </ScrollView>
        <View className="flex-row justify-end gap-3">
          <Pressable
            className="rounded-xl border border-border px-4 py-3"
            onPress={closeBrandsModal}
          >
            <AppText>Cancelar</AppText>
          </Pressable>
          <Pressable className="rounded-xl bg-[#287cff] px-4 py-3" onPress={closeBrandsModal}>
            <AppText className="font-bold text-primary-foreground">Confirmar</AppText>
          </Pressable>
        </View>
      </AnimatedModal>
    </View>
  )
}
