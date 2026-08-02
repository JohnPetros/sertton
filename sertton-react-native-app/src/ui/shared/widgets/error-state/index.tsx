import { CircleAlert } from "lucide-react-native"
import { Pressable, View } from "react-native"

import { AppText } from "@/ui/shared/widgets/app-text"

interface ErrorStateProps {
  readonly message?: string
  readonly onRetry?: () => void
}

export const ErrorState = ({
  message = "Não foi possível carregar este conteúdo.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <View className="items-center gap-3 px-6 py-10">
      <CircleAlert color="#dc2626" size={32} />
      <AppText className="text-center text-muted-foreground">{message}</AppText>
      {onRetry ? (
        <Pressable
          accessibilityLabel="Tentar novamente"
          accessibilityRole="button"
          className="rounded-md bg-primary px-4 py-3"
          onPress={onRetry}
        >
          <AppText className="font-semibold text-primary-foreground">Tentar novamente</AppText>
        </Pressable>
      ) : null}
    </View>
  )
}
