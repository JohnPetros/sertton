import { View, type ViewProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Badge = ({ className, ...props }: ViewProps) => {
  return <View className={cn("self-start rounded-full bg-muted px-2 py-1", className)} {...props} />
}
