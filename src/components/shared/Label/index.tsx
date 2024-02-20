import { Label as Text, XStack } from 'tamagui'

type LabelProps = {
  id: string
  subLabel?: string
  children: string
}

export function Label({ children, id, subLabel }: LabelProps) {
  return (
    <XStack gap={8}>
      <Text htmlFor={id} color='$gray600' fontSize={12} textTransform='uppercase'>
        {children}
      </Text>
      {subLabel && (
        <Text htmlFor={id} color='$gray400' fontSize={12} textTransform='lowercase'>
          {subLabel}
        </Text>
      )}
    </XStack>
  )
}
