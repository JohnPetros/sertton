import { Button } from '@/components/shared/Button'
import { Contacts } from '@/components/shared/Contacts'
import { useProductsFilterStore } from '@/stores/ProductsFilterStore'
import { CaretDown, CaretUp } from 'phosphor-react-native'
import { SafeAreaView } from 'react-native'
import { SCREEN } from 'src/utils/constants/screen'
import { ListItem, Separator, Spinner, View, YGroup, YStack } from 'tamagui'
import { TEST_IDS } from './tests/test-ids'

import { RouteButton } from './RouteButton'
import { ROUTE_BUTTONS } from './constants/route-buttons'
import { useSidebar } from './useSidebar'

// import { RouteButton } from '@/components/layout/Sidebar/RouteButton'
// import { useSidebar } from '@/components/layout/Sidebar/useSidebar'
// import { Button } from '@/components/shared/Button'
// import { Contacts } from '@/components/shared/Contacts'
// import { useProductsFilterStore } from '@/stores/productsFilterStore'
// import { SCREEN } from '@/utils/constants/screen'

export function Sidebar() {
  const selectedCategoryId = useProductsFilterStore((store) => store.state.categoryId)

  const {
    canShowAllCategories,
    categories,
    isLoading,
    handleCategory,
    handleShowAllCategories,
    handleNavigation,
  } = useSidebar()

  return (
    <SafeAreaView>
      <YStack py={24} h={SCREEN.height} px={SCREEN.paddingX} bg='$gray50'>
        <Button
          background='transparent'
          color='$gray900'
          justifyContent='space-between'
          fontWeight='600'
          onPress={handleShowAllCategories}
          ml={-8}
        >
          Categorias {canShowAllCategories ? <CaretUp /> : <CaretDown />}
        </Button>
        <YGroup borderRadius={4}>
          {categories
            ?.slice(0, !canShowAllCategories ? 4 : categories.length)
            .map((category) => (
              <YGroup.Item key={category.id.toString()}>
                <Button
                  testID={TEST_IDS.categoryButton}
                  background='transparent'
                  p={8}
                  ml={-8}
                  onPress={() => handleCategory(category.id)}
                >
                  <ListItem
                    title={category.name}
                    color='$gray700'
                    fontSize={14}
                    bg='$gray50'
                    icon={<View h={4} w={12} borderRadius={8} bg='$blue400' />}
                    position='relative'
                  />
                  <View position='absolute' r={8}>
                    {selectedCategoryId === category.id && isLoading && (
                      <Spinner testID={TEST_IDS.spinner} color='$blue700' />
                    )}
                  </View>
                </Button>
              </YGroup.Item>
            ))}
        </YGroup>
        <YStack mt={12}>
          <Contacts />

          {ROUTE_BUTTONS.map((routeButton) => (
            <RouteButton
              key={routeButton.title}
              icon={routeButton.icon}
              onPress={() => handleNavigation(routeButton.route)}
            >
              {routeButton.title}
            </RouteButton>
          ))}
        </YStack>
      </YStack>
    </SafeAreaView>
  )
}
