import { ShoppingCart } from "lucide-react-native"
import { View } from "react-native"

import { AppText } from "@/ui/shared/widgets/app-text"

export const CartEmptyState = () => {
  return (
    <View className="flex-1 items-center justify-center gap-5 px-6 pb-16">
      <ShoppingCart color="#b7b7bf" size={72} strokeWidth={1.75} />
      <AppText className="text-center text-3xl font-bold">Seu carrinho está vazio</AppText>
      <AppText className="text-center text-lg text-muted-foreground">
        Adicione produtos para começar suas compras
      </AppText>
    </View>
  )
}
