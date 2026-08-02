import { Pressable, type PressableProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Select = ({ className, ...props }: PressableProps) => {
  return (
    <Pressable className={cn("rounded-md border border-border px-3 py-2", className)} {...props} />
  )
}
