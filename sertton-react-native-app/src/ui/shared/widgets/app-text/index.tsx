import { Text, type TextProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

type AppTextProps = TextProps & { readonly className?: string }

export const AppText = ({ className, ...props }: AppTextProps) => {
  return <Text className={cn("text-base text-foreground", className)} {...props} />
}
