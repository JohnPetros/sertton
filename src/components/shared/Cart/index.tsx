import { ShoppingCart, TrashSimple } from 'phosphor-react-native'
import { FlatList } from 'react-native'

import { View, XStack, YStack, getTokens } from 'tamagui'

import { PRODUCT_CART_ITEM_WIDTH } from './constants/product-cart-item-width'

import { cartProductsMock } from '@/_tests_/mocks/core/cartProductsMock'

import { AlertDialog } from '@/components/shared/AlertDialog'
import { Button } from '@/components/shared/Button'
import { CartItem } from '@/components/shared/CartItems/CartItem'
import { CartSummary } from '@/components/shared/CartSummary'
import { EmptyListMessage } from '@/components/shared/EmptyListMessage'
import { Header } from '@/components/shared/Header'
import { ScreenTitle } from '@/components/shared/ScreenTitle'
import { Skeleton } from '@/components/shared/Skeleton'

import { SCREEN } from '@/utils/constants/screen'
import { useCart } from '@/utils/hooks/useCart'

export function Cart() {
  const {
    products,
    isLoading,
    totalCartItems,
    handleRemoveAllItems,
    redirectToCheckout,
  } = useCart()

  const isCartEmpty = totalCartItems <= 0
  const productsMock = cartProductsMock.slice(0, totalCartItems)

  return (
    <YStack px={SCREEN.paddingX} flex={1}>
      <Header />
      <XStack mt={8} alignItems='center' justifyContent='space-between'>
        <ScreenTitle>Meu Carrinho</ScreenTitle>

        {!isCartEmpty && (
          <AlertDialog
            title='Deseja realmente limpar o carrinho?'
            onConfirm={handleRemoveAllItems}
          >
            <Button background='transparent' mr={-12}>
              <TrashSimple color={getTokens().color.gray400.val} weight='bold' />
              Limpar carrinho
            </Button>
          </AlertDialog>
        )}
      </XStack>

      <View flex={1} mt={12}>
        {isCartEmpty ? (
          <EmptyListMessage
            title='Seu carrinho está vazio'
            subtitle='Navegue pela loja e adiciona produtos.'
            icon={ShoppingCart}
            callback={<Button>Procurar produtos</Button>}
          />
        ) : isLoading ? (
          <FlatList
            key='cart-items-loading'
            data={productsMock}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View mb={32}>
                <CartItem
                  data={item}
                  quantity={item.quantity}
                  selectedSkuId={item.selectedSkuId}
                  width={PRODUCT_CART_ITEM_WIDTH}
                  isLoading={true}
                />
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            key='cart-items'
            data={products}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <View mb={32}>
                <CartItem
                  data={item}
                  quantity={item.quantity}
                  selectedSkuId={item.selectedSkuId}
                  width={PRODUCT_CART_ITEM_WIDTH}
                  isLoading={false}
                />
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 180 }}
          />
        )}
        <YStack zIndex={50} position='absolute' bottom={0} py={12} bg='$gray50' w='100%'>
          <Skeleton
            width={SCREEN.width - SCREEN.paddingX * 2}
            height={180}
            isVisible={false}
          >
            <YStack gap={8}>
              {!isCartEmpty && (
                <CartSummary items={products ?? []} isLoading={isLoading} />
              )}

              <Skeleton isVisible={isLoading} height={44} width={SCREEN.width}>
                <Button
                  onPress={redirectToCheckout}
                  w={SCREEN.width - SCREEN.paddingX * 2}
                >
                  Finalizar compra
                </Button>
              </Skeleton>
            </YStack>
          </Skeleton>
        </YStack>
      </View>
    </YStack>
  )
}
