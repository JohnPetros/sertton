import { WifiOff } from "lucide-react-native"
import { Pressable, View } from "react-native"
import { AppText } from "@/ui/shared/widgets/app-text"
import { useOfflineScreen } from "./use-offline-screen"

export const OfflineScreen = () => {
  const { isRetrying, retry } = useOfflineScreen()
  return (
    <View className="flex-1 items-center justify-center gap-5 bg-background px-8">
      <WifiOff color="#6b7280" size={56} />
      <AppText className="text-2xl font-bold">Você está sem conexão</AppText>
      <AppText className="text-center text-muted-foreground">
        Verifique sua internet e tente novamente.
      </AppText>
      <Pressable
        accessibilityLabel="Tentar reconectar"
        accessibilityRole="button"
        className="rounded-md bg-primary px-5 py-3"
        disabled={isRetrying}
        onPress={retry}
      >
        <AppText className="font-semibold text-primary-foreground">
          {isRetrying ? "Conectando..." : "Tentar novamente"}
        </AppText>
      </Pressable>
    </View>
  )
}
