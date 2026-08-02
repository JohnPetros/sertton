import { Linking } from "react-native"
import type { LinkProvider } from "@/core/shared/interfaces/providers"

export const ExpoLinkProvider: LinkProvider = {
  canOpen: Linking.canOpenURL,
  open: async (url) => {
    if (!(await Linking.canOpenURL(url))) throw new Error("Unsupported link")
    await Linking.openURL(url)
  },
}
export const openWhatsApp = async (
  provider: LinkProvider,
  phone: string,
  message = "",
): Promise<void> => {
  const encoded = encodeURIComponent(message)
  const appUrl = `whatsapp://send?phone=${phone}&text=${encoded}`
  await provider.open(
    (await provider.canOpen(appUrl)) ? appUrl : `https://wa.me/${phone}?text=${encoded}`,
  )
}
