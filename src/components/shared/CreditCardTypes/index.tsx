import { SvgUri } from 'react-native-svg'
import { useCreditCardTypes } from './useCreditCardTypes'

import { Skeleton } from '@/components/shared/Skeleton'

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
        return <SvgUri uri={creditCardType.icon} />
      })}
    </>
  )
}
