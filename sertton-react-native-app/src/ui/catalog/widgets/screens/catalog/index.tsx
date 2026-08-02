import { FlatList, View } from "react-native"

import type { Product } from "@/core/catalog/entities"
import { AppHeader } from "@/ui/shared/widgets/app-header"
import { EmptyState } from "@/ui/shared/widgets/empty-state"
import { ErrorState } from "@/ui/shared/widgets/error-state"

import { FiltersBar } from "./filters-bar"
import { ProductCard } from "./product-card"
import { ProductCardSkeleton } from "./product-card/skeleton"
import { useCatalogScreen } from "./use-catalog-screen"

const SKELETON_ITEMS = ["skeleton-1", "skeleton-2", "skeleton-3", "skeleton-4"] as const

export const CatalogScreen = () => {
  const {
    brands,
    brandsIds,
    categories,
    categoryId,
    error,
    isLoading,
    loadMore,
    products,
    refresh,
    setBrandsIds,
    setCategoryId,
    setQuery,
  } = useCatalogScreen()

  return (
    <View className="flex-1 bg-background">
      <AppHeader showSearch onSearch={setQuery} />
      <FiltersBar
        brands={brands}
        brandsIds={brandsIds}
        categories={categories}
        categoryId={categoryId}
        isLoading={isLoading}
        onBrandsChange={setBrandsIds}
        onCategoryChange={setCategoryId}
      />
      {error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : (
        <FlatList<Product | string>
          contentContainerClassName="gap-5 px-4 pb-8"
          data={isLoading ? SKELETON_ITEMS : products}
          keyExtractor={(item) => (typeof item === "string" ? item : item.id)}
          ListEmptyComponent={<EmptyState message="Nenhum produto encontrado." />}
          onEndReached={loadMore}
          renderItem={({ item }) =>
            typeof item === "string" ? <ProductCardSkeleton /> : <ProductCard product={item} />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  )
}
