import { View } from "react-native"

import { Skeleton } from "@/ui/shared/widgets/skeleton"

export const ProductCardSkeleton = () => (
  <View
    accessibilityLabel="Carregando produto"
    className="relative h-44 flex-row overflow-hidden rounded-[24px] border border-border bg-background"
  >
    <Skeleton className="h-44 w-[36%] rounded-none" />
    <View className="flex-1 justify-center gap-3 px-4 py-4">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-32" />
    </View>
  </View>
)
