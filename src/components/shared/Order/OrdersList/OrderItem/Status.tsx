import { Text, styled } from 'tamagui'

export const Status = styled(Text, {
  fontSize: 12,
  borderRadius: 4,
  borderWidth: 1,
  py: 4,
  px: 12,

  variants: {
    type: {
      waiting_payment: {
        bg: '$yellow500',
        color: '$yellow900',
      },
      cancelled: {
        bg: '$red100',
        color: '$red800',
      },
      paid: {
        bg: '$green500',
        color: '$green800',
      },
    },
  } as const,

  defaultVariants: {
    type: 'waiting_payment',
  },
})
