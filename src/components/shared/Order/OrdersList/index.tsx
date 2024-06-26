import { RefObject } from 'react'
import { useRouter } from 'expo-router'
import { Bag } from 'phosphor-react-native'
import { FlatList } from 'react-native'
import { Text, View, XStack, YStack } from 'tamagui'

import { processedOrdersMock } from '@/_tests_/mocks/core/processedOrdersMock'
import { Button } from '@/components/shared/Button'
import { useMask } from '@/utils/hooks/useMask'
import { SCREEN } from '@/utils/constants/screen'

import { OrderItem } from './OrderItem'
import { useOrdersList } from './useOrdersList'
import { DocumentDialog } from '../../DocumentDialog'
import { EmptyListMessage } from '../../EmptyListMessage'
import type { DialogRef } from '../../Dialog/types/DialogRef'

const ORDER_ITEM_HEIGHT = 124

type OrdersListProps = {
  documentDialogRef: RefObject<DialogRef>
}

export function OrdersList({ documentDialogRef }: OrdersListProps) {
  const {
    orders,
    isLoading,
    customerDocument,
    personType,
    handleValidateDocument,
    handleEditCustomerDocument,
  } = useOrdersList(
    documentDialogRef.current?.open ?? null,
    documentDialogRef.current?.close ?? null,
  )

  const router = useRouter()

  const mask = useMask(personType === 'natural' ? 'cpf' : 'cnpj')

  return (
    <>
      <DocumentDialog
        ref={documentDialogRef}
        onValidateDocument={handleValidateDocument}
      />

      {customerDocument && (
        <XStack justifyContent='space-between' alignItems='center' mb={24}>
          <Text fontSize={20} fontWeight='600' color='$blue500'>
            {mask(customerDocument)}
          </Text>
          <Button onPress={handleEditCustomerDocument}>
            Alterar documento
          </Button>
        </XStack>
      )}

      {isLoading ? (
        <FlatList
          data={processedOrdersMock}
          renderItem={({ item, index }) => (
            <View testID={`loading-order-item-${index}`} mb={24}>
              <OrderItem data={item} isLoading={true} />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          disableIntervalMomentum={true}
          scrollEnabled={!isLoading}
        />
      ) : (
        <FlatList
          data={orders}
          extraData={isLoading}
          renderItem={({ item, index }) => (
            <View testID={`order-item-${index}`} mb={24}>
              <OrderItem data={item} isLoading={false} />
            </View>
          )}
          ListEmptyComponent={
            <YStack mt={SCREEN.height / 4}>
              <EmptyListMessage
                title='Nenhum pedido realizado'
                subtitle=''
                callback={
                  <Button mt={12} onPress={router.back}>
                    Voltar
                  </Button>
                }
                icon={Bag}
              />
            </YStack>
          }
          getItemLayout={(_, index) => ({
            index,
            length: ORDER_ITEM_HEIGHT,
            offset: ORDER_ITEM_HEIGHT + index,
          })}
          showsVerticalScrollIndicator={false}
          disableIntervalMomentum={true}
          initialNumToRender={7}
          maxToRenderPerBatch={7}
          scrollEnabled={!isLoading}
        />
      )}
    </>
  )
}
