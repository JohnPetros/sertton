import { DrawerActions, useNavigation } from '@react-navigation/native'
import { ListBullets } from 'phosphor-react-native'
import { XStack, getTokens } from 'tamagui'

import { TEST_IDS } from './tests/constants/test-ids'

import { Button } from '@/components/shared/Button'
import { Logo } from '@/components/shared/Logo'

export function Header() {
  const navigation = useNavigation()

  function handleToggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer())
  }

  return (
    <XStack alignItems='center' justifyContent='space-between'>
      <Button
        testID={TEST_IDS.button}
        background='transparent'
        ml={-8}
        p={8}
        onPress={handleToggleDrawer}
      >
        <ListBullets color={getTokens().color.blue800.val} />
      </Button>
      <Logo />
    </XStack>
  )
}
