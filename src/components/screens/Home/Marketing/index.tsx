import { YStack } from 'tamagui'

import { Banner } from './Banner'

import { Collection } from '@/components/shared/Collection'
import { Skeleton } from '@/components/shared/Skeleton'

import { SCREEN } from '@/utils/constants/screen'

import { useBanners } from './hooks/useBanners'
import { useCollections } from './hooks/useCollections'

import { collectionsMock } from '@/__tests__/mocks/core/collectionsMock'

export function Marketing() {
  const { banners, areBannersLoading } = useBanners()
  const { collections, areCollectionsLoading } = useCollections()

  return (
    <YStack gap={24}>
      {areBannersLoading || !banners ? (
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
      ) : (
        <Banner imageUrl={banners[0].imageUrl} />
      )}

      <YStack px={SCREEN.paddingX}>
        {areCollectionsLoading || !collections ? (
          <Collection
            name={collectionsMock[0].name}
            products={collectionsMock[0].products}
            isLoading={true}
          />
        ) : (
          <Collection
            name={collections[0].name}
            products={collections[0].products}
            isLoading={false}
          />
        )}
      </YStack>

      {areBannersLoading || !banners ? (
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
      ) : (
        <Banner imageUrl={banners[1].imageUrl} />
      )}

      <YStack px={SCREEN.paddingX}>
        {areCollectionsLoading || !collections ? (
          <Collection
            name={collectionsMock[0].name}
            products={collectionsMock[0].products}
            isLoading={true}
          />
        ) : (
          <Collection
            name={collections[1].name}
            products={collections[1].products}
            isLoading={false}
          />
        )}
      </YStack>

      {areBannersLoading || !banners ? (
        <Skeleton isVisible={true} height={300} width={SCREEN.width} />
      ) : (
        <Banner imageUrl={banners[2].imageUrl} />
      )}

      <YStack px={SCREEN.paddingX}>
        {areCollectionsLoading || !collections ? (
          <Collection
            name={collectionsMock[0].name}
            products={collectionsMock[0].products}
            isLoading={true}
          />
        ) : (
          <Collection
            name={collections[2].name}
            products={collections[2].products}
            isLoading={false}
          />
        )}
      </YStack>
    </YStack>
  )
}
