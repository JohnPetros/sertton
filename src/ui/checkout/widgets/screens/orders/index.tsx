import { Pressable, ScrollView, View } from "react-native"

import { DocumentType } from "@/core/shared/rules/document"
import { Input } from "@/ui/reusables/components/input"
import { AppHeader } from "@/ui/shared/widgets/app-header"
import { AppText } from "@/ui/shared/widgets/app-text"
import { EmptyState } from "@/ui/shared/widgets/empty-state"
import { ErrorState } from "@/ui/shared/widgets/error-state"

import { OrderAccordion } from "./order-accordion"
import { useOrdersScreen } from "./use-orders-screen"

export const OrdersScreen = () => {
  const {
    documentType,
    error,
    expandedOrderNumber,
    fetchOrders,
    formattedDocument,
    isDocumentValid,
    isIdentified,
    isLoading,
    orders,
    setDocument,
    setDocumentType,
    toggleOrder,
  } = useOrdersScreen()

  return (
    <View className="flex-1 bg-background">
      <AppHeader showSearch />
      <ScrollView
        contentContainerClassName="gap-6 px-6 pb-10 pt-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-4">
          <AppText className="text-2xl font-bold">Meus Pedidos</AppText>
          <AppText className="text-xl leading-6 text-muted-foreground">
            Para consultar seus pedidos, informe seu documento abaixo.
          </AppText>
        </View>

        <View className="flex-row gap-2">
          <Pressable
            accessibilityLabel="Pessoa Física"
            accessibilityRole="radio"
            accessibilityState={{ selected: documentType === DocumentType.cpf }}
            className={`flex-1 items-center rounded-xl border py-3 ${documentType === DocumentType.cpf ? "border-[#2F80FF] bg-[#2F80FF]" : "border-border bg-background"}`}
            onPress={() => setDocumentType(DocumentType.cpf)}
          >
            <AppText
              className={`text-base font-semibold ${documentType === DocumentType.cpf ? "text-primary-foreground" : "text-foreground"}`}
            >
              Pessoa Física
            </AppText>
          </Pressable>
          <Pressable
            accessibilityLabel="Pessoa Jurídica"
            accessibilityRole="radio"
            accessibilityState={{ selected: documentType === DocumentType.cnpj }}
            className={`flex-1 items-center rounded-xl border py-3 ${documentType === DocumentType.cnpj ? "border-[#2F80FF] bg-[#2F80FF]" : "border-border bg-background"}`}
            onPress={() => setDocumentType(DocumentType.cnpj)}
          >
            <AppText
              className={`text-base font-semibold ${documentType === DocumentType.cnpj ? "text-primary-foreground" : "text-foreground"}`}
            >
              Pessoa Jurídica
            </AppText>
          </Pressable>
        </View>

        <Input
          accessibilityLabel={documentType === DocumentType.cpf ? "CPF" : "CNPJ"}
          className="h-16 rounded-xl border border-border bg-muted/30 px-4 text-xl text-foreground"
          keyboardType="number-pad"
          maxLength={documentType === DocumentType.cpf ? 14 : 18}
          onChangeText={setDocument}
          placeholder={documentType === DocumentType.cpf ? "000.000.000-00" : "00.000.000/0000-00"}
          placeholderTextColor="#8b8b96"
          value={formattedDocument}
        />

        {error && !isIdentified ? <ErrorState message={error} /> : null}

        <Pressable
          accessibilityLabel="Buscar pedidos"
          accessibilityRole="button"
          accessibilityState={{ disabled: !isDocumentValid || isLoading }}
          className="items-center rounded-xl bg-[#2F80FF] py-3 disabled:bg-[#85858f]"
          disabled={!isDocumentValid || isLoading}
          onPress={() => fetchOrders()}
        >
          <AppText className="text-lg font-bold text-primary-foreground">
            {isLoading ? "Buscando pedidos..." : "BUSCAR PEDIDOS"}
          </AppText>
        </Pressable>

        {isIdentified && isLoading ? (
          <View className="items-center justify-center py-10">
            <AppText className="text-muted-foreground">Buscando pedidos...</AppText>
          </View>
        ) : isIdentified && error ? (
          <ErrorState message={error} onRetry={() => fetchOrders()} />
        ) : isIdentified && orders?.length === 0 ? (
          <EmptyState message="Nenhum pedido encontrado para este documento." />
        ) : isIdentified ? (
          <View className="gap-5 pt-4">
            {orders?.map((order) => (
              <OrderAccordion
                key={order.number}
                isExpanded={expandedOrderNumber === order.number}
                order={order}
                onPress={() => toggleOrder(order.number)}
              />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}
