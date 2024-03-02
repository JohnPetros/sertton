import { ReactNode } from 'react'
import { Paragraph, Text, XStack, YStack } from 'tamagui'

import { useShipmentServicesDialog } from './useShipmentServicesDialog'

import type { ShipmentService } from '@/@types/ShipmentService'
import { Dialog } from '@/components/shared/Dialog'
import { Table } from '@/components/shared/Table'
import { Row } from '@/components/shared/Table/Row'
import { formatPrice } from '@/utils/helpers/formatPrice'

type ShippmentServicesDialogProps = {
  children: ReactNode
  zipcode: string
  shipmentServices: ShipmentService[]
  onOpenChange: (isOpen: boolean) => void
}

export function ShipmentServicesDialog({
  children,
  zipcode,
  shipmentServices,
  onOpenChange,
}: ShippmentServicesDialogProps) {
  const { address, handleDialogOpenChange } = useShipmentServicesDialog(
    zipcode,
    shipmentServices,
    onOpenChange
  )

  return (
    <Dialog
      onOpenChange={handleDialogOpenChange}
      title='Simular frete'
      content={
        <YStack>
          <XStack alignItems='center'>
            <Text color='$gray700'>Para o cep </Text>
            <Text color='$blue500' fontWeight='600'>
              {address?.zipcode}
            </Text>
            <Text color='$gray700' ml={4}>
              | {address?.city} - {address?.uf}
            </Text>
          </XStack>
          <Paragraph fontSize={12} mt={8} color='$gray400'>
            Prazo de entrega a partir da aprovação de pagamento e envio ao operador
            logístico.
          </Paragraph>

          <YStack mt={24}>
            <Table header={['Tipo', 'Prazo', 'Valor']}>
              {shipmentServices.map((shipmentService) => (
                <Row
                  key={shipmentService.name}
                  cells={[
                    <Text key={1}>{shipmentService.name}</Text>,
                    <Text key={2}>até {shipmentService.days} dias úteis</Text>,
                    <Text key={3} color='$blue500' fontWeight='600'>
                      {formatPrice(shipmentService.price)}
                    </Text>,
                  ]}
                />
              ))}
            </Table>
          </YStack>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
