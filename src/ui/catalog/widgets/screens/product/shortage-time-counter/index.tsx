import { Timer } from "lucide-react-native"
import { View } from "react-native"

import { AppText } from "@/ui/shared/widgets/app-text"

import { useShortageTimeCounter } from "./use-shortage-time-counter"

interface ShortageTimeCounterProps {
  readonly stock: number
}

export const ShortageTimeCounter = ({ stock }: ShortageTimeCounterProps) => {
  const { remainingTime } = useShortageTimeCounter()

  if (stock <= 0) return null

  return (
    <View className="flex-row items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
      <Timer color="#dc2626" size={21} />
      <AppText className="flex-1 leading-5 text-red-700">
        Apenas <AppText className="font-bold text-red-700">{stock} restantes!</AppText> O estoque
        acaba em: <AppText className="font-bold text-red-700">{remainingTime}</AppText>
      </AppText>
    </View>
  )
}
