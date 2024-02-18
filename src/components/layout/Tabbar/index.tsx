import { Tabs } from 'expo-router'
import { House, MagnifyingGlass, ShoppingBag, ShoppingCart } from 'phosphor-react-native'

import { View } from 'tamagui'

import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { TAB_BAR_HEIGHT } from 'src/utils/constants/tab-bar-height'
import { useTabbar } from './useTabbar'

export function Tabbar() {
  const { handleTabButton } = useTabbar()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
        },
      }}
      initialRouteName='products'
    >
      <Tabs.Screen
        name='products'
        options={{
          tabBarIcon: ({ focused }) => (
            <Button
              background={focused ? 'primary' : 'outline'}
              w={40}
              h={40}
              icon={<MagnifyingGlass size={24} />}
              onPress={() => handleTabButton('products')}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ focused }) => (
            <Button
              background={focused ? 'primary' : 'outline'}
              w={40}
              h={40}
              icon={<House size={24} />}
              onPress={() => handleTabButton('home')}
            />
          ),
        }}
      />

      {/* <Tabs.Screen
        name='cart'
        options={{
          tabBarIcon: ({ focused }) => (
            <View position='relative'>
              {cartItemsQuantity >= 1 && (
                <Badge number={cartItemsQuantity} isActive={focused} />
              )}
              <Button
                background={focused ? 'primary' : 'outline'}
                w={40}
                h={40}
                icon={<ShoppingCart size={24} />}
                onPress={() => handleTabButton('cart')}
              />
            </View>
          ),
        }}
      /> */}

      <Tabs.Screen
        name='orders'
        options={{
          tabBarIcon: ({ focused }) => (
            <Button
              background={focused ? 'primary' : 'outline'}
              w={40}
              h={40}
              icon={<ShoppingBag size={24} />}
              onPress={() => handleTabButton('orders')}
            />
          ),
        }}
      />

      <Tabs.Screen
        name='product-details/[product_slug]'
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}
