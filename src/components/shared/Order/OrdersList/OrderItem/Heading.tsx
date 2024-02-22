import { H4, TextProps } from 'tamagui'

interface TitleProps extends TextProps {
  children: string
}

export function Heading({ children, ...rest }: TitleProps) {
  return (
    <H4
      color='$gray700'
      textTransform='uppercase'
      fontSize={14}
      fontWeight='600'
      lineHeight={24}
      {...rest}
    >
      {children}
    </H4>
  )
}
