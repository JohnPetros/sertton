import { View } from "react-native"

import { AppText } from "@/ui/shared/widgets/app-text"

interface ProductHeaderProps {
  readonly skuCode: string
  readonly title: string
}

export const ProductHeader = ({ skuCode, title }: ProductHeaderProps) => (
  <View className="gap-3">
    <AppText className="text-lg font-bold text-[#287cff]">SKU: {skuCode}</AppText>
    <AppText className="text-3xl font-extrabold leading-6 text-foreground">{title}</AppText>
  </View>
)
