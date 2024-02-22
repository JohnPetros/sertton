import { H3, XStack, YStack } from 'tamagui'
import { Text } from 'tamagui'

import { Address } from './Address'
import { Info } from './Info'
import { Payment } from './Payment'
import { Products } from './Products'
import { useOrderItem } from './useOrderItem'

import type { OrderStatus } from '@/@types/Order'
import type { ProcessedOrder } from '@/@types/ProcessedOrder'

import { Accordion } from '@/components/shared/Accordion'
import { Skeleton } from '@/components/shared/Skeleton'
import { SCREEN } from '@/utils/constants/screen'

type OrderItemProps = {
  data: ProcessedOrder
  isLoading: boolean
}

export function OrderItem({ data, isLoading }: OrderItemProps) {
  const {
    products,
    number,
    status,
    shipmentService,
    createdAt,
    shippingAddress,
    payment,
  } = data

  const { totalDiscount, skusAmount, subtotal } = useOrderItem({ products })

  return (
    <XStack>
      <Skeleton
        isVisible={isLoading}
        width={SCREEN.width - SCREEN.paddingX * 2}
        height={80}
        flex={1}
      >
        {isLoading ? (
          <></>
        ) : (
          <Accordion
            label={
              <YStack>
                <H3 color='$gray800' fontSize={16}>
                  Número do pedido
                </H3>
                <Text color='$gray400' fontSize={14}>
                  #{number}
                </Text>
              </YStack>
            }
          >
            <YStack mt={24} gap={24}>
              <Info
                status={status.alias as OrderStatus}
                statusName={status.name}
                creationDate={new Date(createdAt)}
              />

              <Products
                subtotal={subtotal}
                discount={totalDiscount}
                shipment={shipmentService.price}
                total={subtotal - totalDiscount + shipmentService.price}
                itemsAmount={skusAmount}
                products={{ products }}
              />

              <Address
                number={shippingAddress.number}
                deliveryDate={new Date(shippingAddress.deliveryDate)}
                deliveryDays={shippingAddress.deliveryDays}
                neighborhood={shippingAddress.neighborhood}
                shipmentServiceName={shipmentService.name}
                receiver={shippingAddress.receiver}
                city={shippingAddress.city}
                state={shippingAddress.uf}
                street={shippingAddress.street}
                zipcode={shippingAddress.zipcode}
                complement={shippingAddress.complement}
              />

              <Payment
                name={payment.name}
                icon={payment.icon}
                pdf={payment.pdf}
                method={payment.method}
              />
            </YStack>
          </Accordion>
        )}
      </Skeleton>
    </XStack>
  )
}
