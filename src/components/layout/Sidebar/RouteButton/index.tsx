import { Icon } from 'phosphor-react-native'
import { getTokens } from 'tamagui'

import { Button } from '@/components/shared/Button'

type RouteButtonProps = {
  icon: Icon
  children: string
  onPress: () => void
}

export function RouteButton({ children, icon: Icon, onPress }: RouteButtonProps) {
  return (
    <Button background='transparent' justifyContent='flex-start' px={0} onPress={onPress}>
      <Icon color={getTokens().color.gray600.val} />
      {children}
    </Button>
  )
}
