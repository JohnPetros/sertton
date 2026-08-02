import { TextInput, type TextInputProps } from "react-native"

import { cn } from "@/ui/reusables/utils"

export const Input = ({ className, style, ...props }: TextInputProps) => {
  return (
    <TextInput
      className={cn("rounded-md border border-border px-3 py-2 text-foreground", className)}
      style={[{ paddingHorizontal: 16 }, style]}
      {...props}
    />
  )
}
