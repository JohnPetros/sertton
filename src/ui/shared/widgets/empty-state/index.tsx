import { PackageOpen } from "lucide-react-native"
import { View } from "react-native"

import { AppText } from "@/ui/shared/widgets/app-text"

interface EmptyStateProps {
  readonly message: string
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <View className="items-center gap-3 px-6 py-10">
      <PackageOpen color="#6b7280" size={32} />
      <AppText className="text-center text-muted-foreground">{message}</AppText>
    </View>
  )
}
