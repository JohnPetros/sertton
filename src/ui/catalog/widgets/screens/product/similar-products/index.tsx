import { View } from "react-native"

import { ProductCard } from "@/ui/global/widgets/screens/home/product-card"
import { AppText } from "@/ui/shared/widgets/app-text"
import { Skeleton } from "@/ui/shared/widgets/skeleton"

import { useSimilarProducts } from "./use-similar-products"

interface SimilarProductsProps {
  readonly productId: string
}

export const SimilarProducts = ({ productId }: SimilarProductsProps) => {
  const { isLoading, products } = useSimilarProducts(productId)

  if (isLoading)
    return (
      <View className="gap-3">
        <AppText className="px-5 text-center text-2xl font-extrabold">Produtos similares</AppText>
        <Skeleton className="mx-5 h-72 w-56 rounded-2xl" />
      </View>
    )

  if (!products.length) return null

  return (
    <View className="gap-3">
      <AppText className="px-5 text-center text-2xl font-extrabold">Produtos similares</AppText>
      <ProductCard products={products} />
    </View>
  )
}
