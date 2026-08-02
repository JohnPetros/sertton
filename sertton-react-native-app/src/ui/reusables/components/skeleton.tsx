import { View, type ViewProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Skeleton = ({ className, ...props }: ViewProps) => {
  return <View className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
}
