import { View, type ViewProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Separator = ({ className, ...props }: ViewProps) => {
  return <View className={cn("h-px bg-border", className)} {...props} />
}
