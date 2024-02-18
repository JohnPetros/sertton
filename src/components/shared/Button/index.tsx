import { Button as TamaguiButton, styled } from 'tamagui'

export const Button = styled(TamaguiButton, {
  height: 44,
  color: '$white',
  fontSize: 14,
  borderRadius: 4,
  borderWidth: 1,

  variants: {
    background: {
      primary: {
        bg: '$blue400',
        color: '$white',
      },
      secondary: {
        bg: '$gray400',
        color: '$white',
      },
      outline: {
        bg: '$colorTransparent',
        borderColor: '$blue400',
        color: '$blue400',
      },
      transparent: {
        bg: '$colorTransparent',
        color: '$gray800',
      },
    },
  } as const,

  defaultVariants: {
    background: 'primary',
  },
})
