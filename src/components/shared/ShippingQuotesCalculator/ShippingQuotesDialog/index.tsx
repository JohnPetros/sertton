import { ReactNode } from 'react'
import { Paragraph, ScrollView, Text, XStack, YStack } from 'tamagui'

import { Dialog } from '@/components/shared/Dialog'
import { Table } from '@/components/shared/Table'
import { Row } from '@/components/shared/Table/Row'

import { formatPrice } from '@/utils/helpers/formatPrice'

import { EmptyListMessage } from '../../EmptyListMessage'
import { AddressBook } from 'phosphor-react-native'
import { SCREEN } from '@/utils/constants/screen'
import { Loading } from '../../Loading'
import { ShippingQuote } from '@/@types/ShippingQuote'
import { useShippingQuotesDialog } from './useShippingQuotesDialog'

type ShippmentServicesDialogProps = {
  children: ReactNode
  zipcode: string
  shippingQuotes: ShippingQuote[]
  onOpenChange: (isOpen: boolean) => void
}

export function ShippingQuotesDialog({
  children,
  zipcode,
  shippingQuotes,
  onOpenChange,
}: ShippmentServicesDialogProps) {
  const { address, isLoading, handleDialogOpenChange } =
    useShippingQuotesDialog(zipcode, shippingQuotes, onOpenChange)

  return (
    <Dialog
      title='Simular frete'
      width={SCREEN.width - SCREEN.paddingX * 2}
      height={address ? SCREEN.height * 0.9 : SCREEN.height * 0.5}
      onOpenChange={handleDialogOpenChange}
      content={
        <ScrollView
          flex={1}
          gap={8}
          contentContainerStyle={
            address
              ? null
              : {
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }
          }
        >
          {isLoading ? (
            <Loading message='Calculando frete...' size={200} />
          ) : (
            <>
              {address && (
                <>
                  <XStack alignItems='center'>
                    <Text color='$gray700'>Para o cep: </Text>
                    <Text color='$blue500' fontSize={14} fontWeight='600'>
                      {address.zipcode}
                    </Text>
                  </XStack>
                  <Text color='$gray700' fontSize={14}>
                    {address.city} - {address.uf}
                  </Text>
                  <Paragraph fontSize={12} color='$gray400'>
                    Prazo de entrega a partir da aprovação de pagamento e envio
                    ao operador logístico.
                  </Paragraph>
                </>
              )}

              {!address && (
                <EmptyListMessage
                  title='Nenhum endereço encontrado para esse CEP'
                  subtitle=''
                  icon={AddressBook}
                  callback={null}
                />
              )}

              {address && (
                <YStack mt={12}>
                  <Table header={['Tipo', 'Prazo', 'Valor']}>
                    {shippingQuotes.map((shipmentService) => (
                      <Row
                        key={shipmentService.name}
                        cells={[
                          <Text key={1} color='$gray800' fontWeight='600'>
                            {shipmentService.name}
                          </Text>,
                          <Text key={2} color='$gray800' fontWeight='400'>
                            até {shipmentService.days} dias úteis
                          </Text>,
                          <Text key={3} color='$blue500' fontWeight='600'>
                            {formatPrice(shipmentService.price)}
                          </Text>,
                        ]}
                      />
                    ))}
                  </Table>
                </YStack>
              )}
            </>
          )}
        </ScrollView>
      }
    >
      {children}
    </Dialog>
  )
}
