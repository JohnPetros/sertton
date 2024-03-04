import { ShoppingCart, TrashSimple } from 'phosphor-react-native'
import { FlatList } from 'react-native'
import { Link } from 'expo-router'

import { View, XStack, YStack, getTokens } from 'tamagui'

import { useCart } from './useCart'

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
import { TEST_IDS } from './tests/test-ids'

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
          <YStack testID={TEST_IDS.alertDialog}>
            <AlertDialog
              title='Deseja realmente limpar o carrinho?'
              onConfirm={handleRemoveAllItems}
            >
              <Button background='transparent' mr={-12}>
                <TrashSimple color={getTokens().color.gray400.val} weight='bold' />
                Limpar carrinho
              </Button>
            </AlertDialog>
          </YStack>
        )}
      </XStack>

      <View flex={1} mt={12}>
        {isCartEmpty ? (
          <EmptyListMessage
            title='Seu carrinho está vazio'
            subtitle='Navegue pela loja e adiciona produtos.'
            icon={ShoppingCart}
            callback={
              <Link
                href='/(stack)/(drawer)/(tabs)/products'
                asChild
                style={{ marginTop: 12 }}
              >
                <Button>Procurar produtos</Button>
              </Link>
            }
          />
        ) : isLoading ? (
          <View testID={TEST_IDS.itemsListPlaceholder}>
            <FlatList
              key='cart-items-loading'
              data={productsMock}
              keyExtractor={(item) => item.id}
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
          </View>
        ) : (
          <View testID={TEST_IDS.itemsList}>
            <FlatList
              key='cart-items'
              data={products}
              keyExtractor={(item) => item.selectedSkuId}
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
          </View>
        )}
        <YStack zIndex={50} position='absolute' bottom={0} py={12} bg='$gray50' w='100%'>
          <Skeleton
            width={SCREEN.width - SCREEN.paddingX * 2}
            height={180}
            isVisible={false}
          >
            <YStack gap={8}>
              {!isCartEmpty && (
                <YStack testID={TEST_IDS.cartSummary}>
                  <CartSummary items={products ?? []} isLoading={isLoading} />
                </YStack>
              )}

              {!isCartEmpty && (
                <Skeleton isVisible={isLoading} height={44} width={SCREEN.width}>
                  <Button
                    onPress={redirectToCheckout}
                    w={SCREEN.width - SCREEN.paddingX * 2}
                  >
                    Finalizar compra
                  </Button>
                </Skeleton>
              )}
            </YStack>
          </Skeleton>
        </YStack>
      </View>
    </YStack>
  )
}
