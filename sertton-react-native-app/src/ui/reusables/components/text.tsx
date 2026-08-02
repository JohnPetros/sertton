import { Text as NativeText, type TextProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Text = ({ className, ...props }: TextProps) => {
  return <NativeText className={cn("text-base text-foreground", className)} {...props} />
}
