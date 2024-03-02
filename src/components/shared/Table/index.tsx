import { ReactNode } from 'react'
import { Text, XStack, YStack } from 'tamagui'

import { Cell } from './Cell'

type TableProps = {
  header: string[]
  children: ReactNode
}

export function Table({ header, children }: TableProps) {
  return (
    <YStack w='100%' borderRadius={4}>
      <XStack w='100%'>
        {header.map((heading) => (
          <Cell key={heading}>
            <Text fontWeight='600' fontSize={14} textTransform='capitalize'>
              {heading}
            </Text>
          </Cell>
        ))}
      </XStack>
      {children}
    </YStack>
  )
}
