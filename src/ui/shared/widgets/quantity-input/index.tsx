import { Minus, Plus } from "lucide-react-native"
import { Pressable, View } from "react-native"

import { AppText } from "@/ui/shared/widgets/app-text"

import { useQuantityInput } from "./use-quantity-input"

interface QuantityInputProps {
  readonly max: number
  readonly onChange: (quantity: number) => void
  readonly value: number
}

export const QuantityInput = ({ max, onChange, value }: QuantityInputProps) => {
  const { decrement, increment, isDecrementDisabled, isIncrementDisabled } = useQuantityInput({
    max,
    onChange,
    value,
  })

  return (
    <View className="flex-row items-center rounded-md border border-border">
      <Pressable
        accessibilityLabel="Diminuir quantidade"
        accessibilityRole="button"
        accessibilityState={{ disabled: isDecrementDisabled }}
        className="p-3 disabled:opacity-40"
        disabled={isDecrementDisabled}
        onPress={decrement}
      >
        <Minus color="#1f2937" size={18} />
      </Pressable>
      <AppText
        accessibilityLabel={`Quantidade: ${value}`}
        className="min-w-8 text-center font-semibold"
      >
        {value}
      </AppText>
      <Pressable
        accessibilityLabel="Aumentar quantidade"
        accessibilityRole="button"
        accessibilityState={{ disabled: isIncrementDisabled }}
        className="p-3 disabled:opacity-40"
        disabled={isIncrementDisabled}
        onPress={increment}
      >
        <Plus color="#1f2937" size={18} />
      </Pressable>
    </View>
  )
}
