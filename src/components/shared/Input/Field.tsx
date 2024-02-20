import { Input, styled } from 'tamagui'

export const Field = styled(Input, {
  height: 44,
  fontSize: 14,
  borderRadius: 4,
  borderBottomWidth: 2,
  bg: '$gray100',

  variants: {
    state: {
      default: {
        color: '$gray900',
        focusStyle: {
          borderBottomColor: '$blue400',
        },
      },
      success: {
        bg: '$green50',
        color: '$green900',
        borderBottomColor: '$green500',
      },
      error: {
        bg: '$red100',
        color: '$red400',
        borderBottomColor: '$red500',
      },
      disabled: {
        bg: '$gray200',
      },
    },
  } as const,

  defaultVariants: {
    state: 'default',
  },
})
