import { ScrollView, View } from "react-native"

import { Skeleton } from "@/ui/shared/widgets/skeleton"

const HomeProductCardSkeleton = () => (
  <View className="w-56 gap-3 rounded-2xl border border-border bg-background p-3">
    <Skeleton className="h-48 w-full rounded-xl" />
    <Skeleton className="h-4 w-28" />
    <Skeleton className="h-5 w-32" />
    <Skeleton className="h-6 w-44" />
    <Skeleton className="h-5 w-28" />
  </View>
)

const HomeCollectionSkeleton = ({ showBanner }: { readonly showBanner: boolean }) => (
  <View className="gap-4">
    <Skeleton className="mx-5 h-9 w-44" />
    <ScrollView
      contentContainerClassName="gap-4 px-5"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <HomeProductCardSkeleton />
      <HomeProductCardSkeleton />
    </ScrollView>
    {showBanner ? <Skeleton className="h-52 w-full rounded-none" /> : null}
  </View>
)

export const HomeSkeleton = () => (
  <View className="gap-8">
    <HomeCollectionSkeleton showBanner />
    <HomeCollectionSkeleton showBanner={false} />
    <View className="mx-5 gap-5 rounded-[28px] bg-muted px-7 py-10">
      <View className="items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-72" />
        <Skeleton className="h-5 w-56" />
      </View>
      <Skeleton className="h-14 w-full rounded-xl" />
      <Skeleton className="h-14 w-full rounded-xl" />
    </View>
  </View>
)
