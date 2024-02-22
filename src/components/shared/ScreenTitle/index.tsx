import { H1 } from 'tamagui'

type ScreenTitleProps = {
  children: string
}

export function ScreenTitle({ children }: ScreenTitleProps) {
  return (
    <H1 fontSize={24} color='$gray800' letterSpacing={1.2} fontWeight='600'>
      {children}
    </H1>
  )
}
