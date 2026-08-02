import { CreditCard } from "lucide-react-native"
import { Pressable } from "react-native"
import { SvgUri } from "react-native-svg"

import type { Payment } from "@/core/checkout/entities"
import { AppText } from "@/ui/shared/widgets/app-text"

import { usePaymentOption } from "./use-payment-option"

interface PaymentOptionProps {
  readonly isSelected: boolean
  readonly payment: Payment
  readonly onSelect: (paymentId: string) => void
}

export const PaymentOption = ({ isSelected, payment, onSelect }: PaymentOptionProps) => {
  const { select } = usePaymentOption(payment.id, onSelect)

  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected }}
      className={`flex-row items-center gap-3 rounded-xl border p-3 ${isSelected ? "border-[#287cff] bg-[#eff6ff]" : "border-border"}`}
      onPress={select}
    >
      {payment.icon ? (
        <SvgUri height={28} uri={payment.icon} width={40} />
      ) : (
        <CreditCard color="#287cff" size={23} />
      )}
      <AppText className="font-semibold">{payment.name}</AppText>
    </Pressable>
  )
}
