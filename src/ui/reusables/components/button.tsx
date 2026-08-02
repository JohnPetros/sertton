import { Pressable, type PressableProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Button = ({ className, ...props }: PressableProps) => {
  return (
    <Pressable
      className={cn("items-center rounded-md bg-primary px-4 py-3", className)}
      {...props}
    />
  )
}
