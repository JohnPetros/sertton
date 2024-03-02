import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useGlobalSearchParams } from 'expo-router'
import { ScrollView, View, YStack } from 'tamagui'

import { ProductDescription } from './ProductDescription'
import { ProductImage } from './ProductImage'
import { ProductInfo } from './ProductInfo'
import { ProductStock } from './ProductStock'
import { ShipmentServices } from './ShipmentServices'
import { useProductDetails } from './useProductDetails'

import { Button } from '@/components/shared/Button'
import { Collection } from '@/components/shared/Collection'
import { Header } from '@/components/shared/Header'
import { NumberInput } from '@/components/shared/NumberInput'
import { Search } from '@/components/shared/Search'
import { Skeleton } from '@/components/shared/Skeleton'
import { SkuSelectors } from '@/components/shared/SkuSelectors'
import { SCREEN } from '@/utils/constants/screen'

export function ProductDetails() {
  const { productSlug } = useGlobalSearchParams()

  const {
    product,
    similarProducts,
    isLoading,
    scrollRef,
    skuSelectsRef,
    selectedSku,
    hasVariations,
    quantity,
    handleAddToCart,
    handleQuantityChange,
    handleSkuChange,
  } = useProductDetails(String(productSlug))
  const bottomTabBarHeight = useBottomTabBarHeight()

  return (
    <>
      <YStack zIndex={-100}>
        <View px={SCREEN.paddingX}>
          <Header />
          <Search />
        </View>

        <ScrollView
          ref={(ref) => {
            scrollRef.current = ref
          }}
          contentContainerStyle={{
            paddingBottom: bottomTabBarHeight * 6,
          }}
          scrollEnabled={!isLoading}
          showsVerticalScrollIndicator={false}
        >
          <Skeleton isVisible={isLoading} width={SCREEN.width} height={280}>
            {selectedSku && <ProductImage url={selectedSku.imageUrl} />}
          </Skeleton>
          <YStack px={SCREEN.paddingX} mt={12} gap={8}>
            <ProductInfo
              productName={product?.name ?? ''}
              sku={selectedSku}
              isLoading={isLoading}
            />
            <YStack mt={hasVariations ? 12 : 0} gap={32} alignItems='flex-start'>
              <View position='relative'>
                <View position='absolute' zIndex={50}>
                  <Skeleton
                    isVisible={isLoading}
                    width={SCREEN.width - SCREEN.paddingX}
                    height={70}
                  />
                </View>
                {product && (
                  <SkuSelectors
                    ref={skuSelectsRef}
                    isDisabled={isLoading}
                    productId={product.id}
                    onSkuChange={handleSkuChange}
                  />
                )}
              </View>

              <Skeleton isVisible={isLoading} height={40}>
                {product && (
                  <NumberInput
                    label={`Quantidade do produto ${product.name}`}
                    number={quantity}
                    onChangeNumber={handleQuantityChange}
                  />
                )}
              </Skeleton>

              <Skeleton isVisible={isLoading} height={40}>
                {selectedSku && <ProductStock sku={selectedSku} />}
              </Skeleton>

              {isLoading ? (
                <Skeleton isVisible={isLoading} width={SCREEN.width} height={40} />
              ) : (
                <Button w='100%' onPress={handleAddToCart}>
                  Adicionar ao carinho
                </Button>
              )}
            </YStack>

            {/* {selectedSku && product && (
              <View mt={24}>
                <Skeleton isVisible={isLoading} width={SCREEN.width - 48} height={40}>
                  <ShipmentServices
                    product={{
                      ...selectedSku,
                      quantity,
                    }}
                  />
                </Skeleton>
              </View>
            )} */}

            {product && !isLoading && (
              <YStack mt={24} gap={24}>
                <ProductDescription
                  description={product.description}
                  specifications={product.specifications}
                />
                <YStack>
                  {similarProducts && (
                    <Collection
                      name='Produtos relacionados'
                      products={similarProducts ?? []}
                      isLoading={false}
                    />
                  )}
                </YStack>
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </YStack>
      {/* {!isSkeletonVisible && selectedSku && (
        <BottomCartButton
          onPress={handleAddToCart}
          priceSale={selectedSku?.price_sale}
          priceDiscount={selectedSku?.price_discount}
        />
      )} */}
    </>
  )
}
