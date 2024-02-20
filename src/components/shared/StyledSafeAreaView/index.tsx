import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'tamagui'

export const StyledSafeAreaView = styled(SafeAreaView, {
  name: 'StyledSafeAreaView',
  flex: 1,
  backgroundColor: '$gray50',
})
