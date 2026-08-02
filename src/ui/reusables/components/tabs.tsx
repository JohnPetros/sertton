import { View, type ViewProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Tabs = ({ className, ...props }: ViewProps) => {
  return <View className={cn("flex-row gap-2", className)} {...props} />
}
