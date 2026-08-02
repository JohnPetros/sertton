import { View, type ViewProps } from "react-native"
import { cn } from "@/ui/reusables/utils"

export const Skeleton = ({ className, ...props }: ViewProps & { readonly className?: string }) => (
  <View
    accessibilityLabel="Carregando"
    className={cn("animate-pulse rounded-md bg-muted", className)}
    {...props}
  />
)
