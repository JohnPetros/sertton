import { View, type ViewProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Card = ({ className, ...props }: ViewProps) => {
  return (
    <View
      className={cn("rounded-lg border border-border bg-background p-4", className)}
      {...props}
    />
  )
}
