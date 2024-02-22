import { Link, Tabs } from 'expo-router'
import { House, MagnifyingGlass, ShoppingBag, ShoppingCart } from 'phosphor-react-native'

import { View } from 'tamagui'

import { Badge } from '@/components/shared/Badge'
import { Button } from '@/components/shared/Button'
import { TAB_BAR_HEIGHT } from 'src/utils/constants/tab-bar-height'

import { useCartStore } from '@/stores/CartStore'

export function Tabbar() {
  const cartItemsQuantity = useCartStore((store) => store.state.items.length)

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
            <Link href='/(stack)/(drawer)/(tabs)/products' asChild>
              <Button
                background={focused ? 'primary' : 'outline'}
                w={40}
                h={40}
                icon={<MagnifyingGlass size={24} />}
              />
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ focused }) => (
            <Link href='/(stack)/(drawer)/(tabs)/home' asChild>
              <Button
                background={focused ? 'primary' : 'outline'}
                w={40}
                h={40}
                icon={<House size={24} />}
              />
            </Link>
          ),
        }}
      />

      <Tabs.Screen
        name='cart'
        options={{
          tabBarIcon: ({ focused }) => (
            <View position='relative'>
              {cartItemsQuantity >= 1 && (
                <Badge isActive={focused}>{cartItemsQuantity.toString()}</Badge>
              )}
              <Link href='/(stack)/(drawer)/(tabs)/cart' asChild>
                <Button
                  background={focused ? 'primary' : 'outline'}
                  w={40}
                  h={40}
                  icon={<ShoppingCart size={24} />}
                />
              </Link>
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name='orders'
        options={{
          tabBarIcon: ({ focused }) => (
            <Link href='/(stack)/(drawer)/(tabs)/orders' asChild>
              <Button
                background={focused ? 'primary' : 'outline'}
                w={40}
                h={40}
                icon={<ShoppingBag size={24} />}
              />
            </Link>
          ),
        }}
      />

      <Tabs.Screen name='[productSlug]' options={{ href: null }} />
    </Tabs>
  )
}
