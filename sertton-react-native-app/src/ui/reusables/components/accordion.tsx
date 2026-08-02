import { View, type ViewProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Accordion = ({ className, ...props }: ViewProps) => {
  return <View className={cn("border-b border-border", className)} {...props} />
}
