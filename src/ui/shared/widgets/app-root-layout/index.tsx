import { Stack } from "expo-router"

import { RestContextProvider } from "@/ui/shared/contexts/rest-context/rest-context"
import { ConnectivityGuard } from "@/ui/shared/widgets/connectivity-guard"

export const AppRootLayout = () => {
  return (
    <RestContextProvider>
      <ConnectivityGuard>
        <Stack screenOptions={{ headerShown: false }} />
      </ConnectivityGuard>
    </RestContextProvider>
  )
}
