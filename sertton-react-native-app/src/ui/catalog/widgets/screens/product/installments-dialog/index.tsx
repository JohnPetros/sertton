import { ChevronDown, CreditCard, X } from "lucide-react-native"
import { Pressable, ScrollView, View } from "react-native"
import { SvgUri } from "react-native-svg"

import { AnimatedModal } from "@/ui/shared/widgets/animated-modal"
import { AppText } from "@/ui/shared/widgets/app-text"

import { PaymentOption } from "./payment-option"
import { useInstallmentsDialog } from "./use-installments-dialog"

interface InstallmentsDialogProps {
  readonly isOpen: boolean
  readonly productId: string
  readonly productPrice: number
  readonly onClose: () => void
}

export const InstallmentsDialog = ({
  isOpen,
  productId,
  productPrice,
  onClose,
}: InstallmentsDialogProps) => {
  const {
    error,
    installments,
    isLoading,
    isPaymentSelectorOpen,
    payments,
    selectPayment,
    selectedPayment,
    togglePaymentSelector,
  } = useInstallmentsDialog({ isOpen, productId, productPrice })

  return (
    <AnimatedModal
      backdropClassName="items-center justify-center p-5"
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      contentClassName="max-h-[85%] w-full max-w-lg rounded-2xl bg-background p-5"
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View className="mb-5 flex-row items-center justify-between">
        <AppText className="text-2xl font-bold">Parcelamento</AppText>
        <Pressable
          accessibilityLabel="Fechar parcelamento"
          accessibilityRole="button"
          onPress={onClose}
        >
          <X color="#27272a" size={24} />
        </Pressable>
      </View>
      <ScrollView contentContainerClassName="gap-5">
        <View className="gap-2">
          <AppText className="text-xs font-bold tracking-wider text-muted-foreground">
            BANDEIRA
          </AppText>
          <Pressable
            accessibilityLabel="Selecionar bandeira"
            accessibilityRole="button"
            className="flex-row items-center justify-between rounded-xl border border-border px-4 py-3"
            onPress={togglePaymentSelector}
          >
            <View className="flex-row items-center gap-3">
              {selectedPayment?.icon ? (
                <SvgUri height={28} uri={selectedPayment.icon} width={40} />
              ) : (
                <CreditCard color="#287cff" size={23} />
              )}
              <AppText className="font-semibold">{selectedPayment?.name ?? "Selecione"}</AppText>
            </View>
            <ChevronDown color="#71717a" size={20} />
          </Pressable>
          {isPaymentSelectorOpen ? (
            <View className="gap-2">
              {payments.map((payment) => (
                <PaymentOption
                  key={payment.id}
                  isSelected={payment.id === selectedPayment?.id}
                  payment={payment}
                  onSelect={selectPayment}
                />
              ))}
            </View>
          ) : null}
        </View>
        <AppText className="text-sm text-muted-foreground">
          Valores para 1 unidade do produto
        </AppText>
        <View className="overflow-hidden rounded-xl border border-border">
          <View className="flex-row bg-muted/40 px-3 py-3">
            <AppText className="w-[18%] text-xs font-bold">Nº</AppText>
            <AppText className="w-[52%] text-xs font-bold">Valor da parcela</AppText>
            <AppText className="w-[30%] text-xs font-bold">Total</AppText>
          </View>
          {installments.map((installment) => (
            <View key={installment.number} className="flex-row border-t border-border px-3 py-3">
              <AppText className="w-[18%]">{installment.number}x</AppText>
              <AppText className="w-[52%] text-sm">{installment.text}</AppText>
              <AppText className="w-[30%] text-sm">{installment.totalValue}</AppText>
            </View>
          ))}
        </View>
        {isLoading ? (
          <AppText className="text-center text-muted-foreground">Carregando...</AppText>
        ) : null}
        {error ? <AppText className="text-center text-destructive">{error}</AppText> : null}
      </ScrollView>
    </AnimatedModal>
  )
}
