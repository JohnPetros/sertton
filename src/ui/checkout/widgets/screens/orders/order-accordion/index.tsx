import { ChevronDown, ChevronUp } from "lucide-react-native"
import { Pressable, View } from "react-native"

import { type Order, OrderStatus } from "@/core/checkout/entities"
import { formatCurrency, formatDate } from "@/core/shared/rules/formatters"
import { AppText } from "@/ui/shared/widgets/app-text"

interface OrderAccordionProps {
  readonly isExpanded: boolean
  readonly onPress: () => void
  readonly order: Order
}

const statusDetails: Record<OrderStatus, { readonly className: string; readonly label: string }> = {
  [OrderStatus.authorized]: {
    className: "border-[#2D9CDB] bg-blue-50 text-[#2D9CDB]",
    label: "Autorizado",
  },
  [OrderStatus.cancelled]: {
    className: "border-red-300 bg-red-50 text-red-600",
    label: "Cancelado",
  },
  [OrderStatus.created]: {
    className: "border-[#2D9CDB] bg-blue-50 text-[#2D9CDB]",
    label: "Criado",
  },
  [OrderStatus.delivered]: {
    className: "border-green-300 bg-green-50 text-[#27AE60]",
    label: "Entregue",
  },
  [OrderStatus.paid]: { className: "border-green-300 bg-green-50 text-[#27AE60]", label: "Pago" },
  [OrderStatus.refused]: { className: "border-red-300 bg-red-50 text-red-600", label: "Recusado" },
  [OrderStatus.waitingPayment]: {
    className: "border-orange-300 bg-orange-50 text-orange-500",
    label: "Pendente",
  },
}

export const OrderAccordion = ({ isExpanded, onPress, order }: OrderAccordionProps) => {
  const productsTotal = order.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const originalTotal = order.items.reduce(
    (total, item) => total + item.skuSalePrice * item.quantity,
    0,
  )
  const discount = Math.max(0, originalTotal - productsTotal)
  const total = productsTotal + order.shippingPrice
  const status = statusDetails[order.status]

  return (
    <View className="overflow-hidden rounded-3xl border border-border bg-background p-5">
      <Pressable
        accessibilityLabel={`Pedido ${order.number}`}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        className="gap-4"
        onPress={onPress}
      >
        <View className="flex-row items-center justify-between">
          <AppText className="text-2xl font-bold">Número do pedido</AppText>
          {isExpanded ? (
            <ChevronUp color="#71717a" size={26} />
          ) : (
            <ChevronDown color="#71717a" size={26} />
          )}
        </View>
        <View className="flex-row items-center justify-between border-b border-border pb-4">
          <AppText className="flex-1 text-lg text-muted-foreground" numberOfLines={1}>
            #{order.number}
          </AppText>
          <AppText className="text-lg text-muted-foreground">{formatDate(order.createdAt)}</AppText>
        </View>
      </Pressable>
      {isExpanded ? (
        <View className="gap-6 pt-6">
          <View className="flex-row gap-6">
            <View className="flex-1 gap-2">
              <AppText className="text-sm font-bold tracking-wider text-muted-foreground">
                STATUS
              </AppText>
              <View className={`self-start rounded-lg border px-3 py-2 ${status.className}`}>
                <AppText className="font-semibold">{status.label}</AppText>
              </View>
            </View>
            <View className="flex-1 gap-2">
              <AppText className="text-sm font-bold tracking-wider text-muted-foreground">
                DATA
              </AppText>
              <AppText className="text-xl font-semibold">{formatDate(order.createdAt)}</AppText>
            </View>
          </View>
          <View className="gap-4">
            <AppText className="text-sm font-bold tracking-wider text-muted-foreground">
              PRODUTOS
            </AppText>
            {order.items.map((item) => (
              <View key={item.id} className="gap-2">
                <View className="flex-row justify-between gap-4">
                  <AppText className="flex-1 font-semibold text-[#2D9CDB]">
                    SKU: {item.skuCode}
                  </AppText>
                  <AppText>qtd.: {item.quantity}</AppText>
                </View>
                <AppText className="text-lg" numberOfLines={2}>
                  {item.skuName}
                </AppText>
                <View className="flex-row items-center gap-3">
                  {item.skuSalePrice > item.price ? (
                    <AppText className="text-muted-foreground line-through">
                      {formatCurrency(item.skuSalePrice)}
                    </AppText>
                  ) : null}
                  <AppText className="text-xl font-bold text-[#2D9CDB]">
                    {formatCurrency(item.price)}
                  </AppText>
                </View>
              </View>
            ))}
          </View>
          <View className="gap-3 border-t border-border pt-5">
            <View className="flex-row justify-between">
              <AppText className="text-muted-foreground">
                Produtos ({order.items.length} {order.items.length === 1 ? "item" : "itens"})
              </AppText>
              <AppText className="font-semibold">{formatCurrency(productsTotal)}</AppText>
            </View>
            <View className="flex-row justify-between">
              <AppText className="text-muted-foreground">Frete</AppText>
              <AppText className="font-semibold">{formatCurrency(order.shippingPrice)}</AppText>
            </View>
            {discount > 0 ? (
              <View className="flex-row justify-between">
                <AppText className="text-[#27AE60]">Desconto</AppText>
                <AppText className="font-semibold text-[#27AE60]">
                  - {formatCurrency(discount)}
                </AppText>
              </View>
            ) : null}
            <View className="flex-row justify-between pt-1">
              <AppText className="text-2xl font-bold">Total</AppText>
              <AppText className="text-2xl font-bold text-[#2D9CDB]">
                {formatCurrency(total)}
              </AppText>
            </View>
          </View>
          <View className="gap-2 border-t border-border pt-5">
            <AppText className="text-sm font-bold tracking-wider text-muted-foreground">
              ENDEREÇO DE ENTREGA
            </AppText>
            <AppText className="text-xl font-semibold">{order.shippingAddress.receiver}</AppText>
            <AppText>{`${order.shippingAddress.street}, ${order.shippingAddress.number}${order.shippingAddress.complement ? ` - ${order.shippingAddress.complement}` : ""}`}</AppText>
            <AppText>{`${order.shippingAddress.neighborhood}, ${order.shippingAddress.city} / ${order.shippingAddress.uf}`}</AppText>
            <AppText>CEP: {order.shippingAddress.zipcode}</AppText>
          </View>
        </View>
      ) : null}
    </View>
  )
}
