import { LinearGradient } from 'expo-linear-gradient'
import { ReactNode } from 'react'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { YStack, YStackProps } from 'tamagui'

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

type SkeletonProps = {
  children?: ReactNode
  width?: number
  height?: number
  isVisible: boolean
} & YStackProps

export function Skeleton({ children, width, height, isVisible, ...rest }: SkeletonProps) {
  return (
    <YStack accessible={true} {...rest}>
      <ShimmerPlaceholder width={width} height={height} visible={!isVisible}>
        {children}
      </ShimmerPlaceholder>
    </YStack>
  )
}
