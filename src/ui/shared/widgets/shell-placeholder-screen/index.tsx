import { View } from "react-native"

import { AppHeader } from "@/ui/shared/widgets/app-header"
import { AppText } from "@/ui/shared/widgets/app-text"

interface ShellPlaceholderScreenProps {
  readonly title: string
}

export const ShellPlaceholderScreen = ({ title }: ShellPlaceholderScreenProps) => {
  return (
    <View className="flex-1 bg-background">
      <AppHeader title={title} />
      <View className="flex-1 items-center justify-center px-6">
        <AppText className="text-center text-muted-foreground">
          Esta experiência será migrada na Fase 5.
        </AppText>
      </View>
    </View>
  )
}
