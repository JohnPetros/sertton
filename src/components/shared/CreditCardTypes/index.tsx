import SvgUri from 'react-native-svg-uri'

import { useCreditCardTypes } from './useCreditCardTypes'

import { Skeleton } from '@/components/shared/Skeleton'
import { Image } from 'tamagui'

export function CreditCardTypes() {
  const { creditCardTypes, isLoading } = useCreditCardTypes()

  console.log({ creditCardTypes })

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

  if (creditCardTypes)
    creditCardTypes.map((creditCardType) => {
      return (
        <Svg
          testID={`credit-card-type-${creditCardType.name}`}
          key={creditCardType.name}
          source={{ uri: creditCardType.icon }}
        />
      )
    })
}
