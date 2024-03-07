import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'phosphor-react-native'
import { getTokens, XStack } from 'tamagui'

import { Slider } from '@/components/shared/Slider'
import { SliderRef } from '@/components/shared/Slider/types/SliderRef'
import { Button } from '@/components/shared/Button'

import { SCREEN } from '@/utils/constants/screen'

import { INFORMATIVE_HIGHLIGHTS } from './constants/Informative-highlights'

import { InformativeHiglight } from './types/InformativeHighlight'

import { useInformativeHighlights } from './useInformativeHighlights'
import { Text } from 'tamagui'

export function InformativeHighlights() {
  const sliderRef = useRef<SliderRef>(null)

  const { handlePreviousButtonPress, handleNextButtonPress } = useInformativeHighlights(
    INFORMATIVE_HIGHLIGHTS.length - 1,
    sliderRef
  )

  return (
    <XStack>
      <Button
        position='absolute'
        top={-12}
        left={-24}
        zIndex={50}
        background='transparent'
        onPress={handlePreviousButtonPress}
        icon={<ArrowLeft size={16} weight='bold' color={getTokens().color.gray800.val} />}
      />
      <Slider<InformativeHiglight>
        innerRef={sliderRef}
        data={INFORMATIVE_HIGHLIGHTS}
        renderItem={({ item }) => {
          const Icon = item.icon
          return (
            <XStack
              key={item.text}
              w={SCREEN.width}
              alignItems='center'
              justifyContent='center'
              gap={8}
              x={-24}
            >
              <Icon color={getTokens().color.blue500.val} size={24} weight='bold' />
              <Text color='$gray800' fontWeight='600' fontSize={14}>
                {item.text}
              </Text>
            </XStack>
          )
        }}
      />
      <Button
        position='absolute'
        top={-12}
        right={-24}
        zIndex={50}
        background='transparent'
        onPress={handleNextButtonPress}
        icon={
          <ArrowRight size={16} weight='bold' color={getTokens().color.gray800.val} />
        }
      />
    </XStack>
  )
}
