import { ArrowDown } from "lucide-react-native"
import { View } from "react-native"

import { AppText } from "@/ui/shared/widgets/app-text"

interface DiscountBadgeProps {
  readonly discount: number
}

export const DiscountBadge = ({ discount }: DiscountBadgeProps) => {
  if (discount <= 0) return null

  return (
    <View className="flex-row items-center gap-1 rounded-full bg-[#dceaff] px-3 py-1">
      <ArrowDown color="#287cff" size={14} />
      <AppText className="text-sm font-bold text-[#287cff]">{discount}%</AppText>
    </View>
  )
}
