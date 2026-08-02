import { View } from "react-native"

const SkeletonBlock = ({ className }: { readonly className: string }) => (
  <View className={`rounded-xl bg-muted/50 ${className}`} />
)

export const CartItemCardSkeleton = () => {
  return (
    <View className="flex-row gap-4 rounded-3xl border border-border bg-background p-4">
      <SkeletonBlock className="h-28 w-28" />
      <View className="flex-1 gap-3 py-1">
        <SkeletonBlock className="h-4 w-24" />
        <SkeletonBlock className="h-6 w-full" />
        <SkeletonBlock className="h-4 w-2/3" />
        <SkeletonBlock className="mt-2 h-10 w-28" />
      </View>
    </View>
  )
}
