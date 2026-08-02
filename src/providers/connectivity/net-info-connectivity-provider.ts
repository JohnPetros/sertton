import NetInfo from "@react-native-community/netinfo"
import type { ConnectivityProvider } from "@/core/shared/interfaces/providers"

export const NetInfoConnectivityProvider: ConnectivityProvider = {
  getIsConnected: async () => (await NetInfo.fetch()).isConnected === true,
  subscribe: (listener) => {
    const subscription = NetInfo.addEventListener((state) => listener(state.isConnected === true))
    return () => subscription()
  },
}
