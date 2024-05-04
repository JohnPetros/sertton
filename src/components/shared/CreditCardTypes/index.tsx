import { SvgUri } from 'react-native-svg'
import { useCreditCardTypes } from './useCreditCardTypes'

import { Skeleton } from '@/components/shared/Skeleton'
import { View } from 'tamagui'

export function CreditCardTypes() {
  const { creditCardTypes, isLoading } = useCreditCardTypes()

  if (isLoading) {
    return (
      <>
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
      </>
    )
  }

  return (
    <>
      {creditCardTypes?.map((creditCardType) => {
        return (
          <View key={creditCardType.id} testID={creditCardType.id}>
            <SvgUri uri={creditCardType.icon} />
          </View>
        )
      })}
    </>
  )
}
