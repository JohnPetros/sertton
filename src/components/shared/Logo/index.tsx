import { Image } from 'tamagui'

export function Logo() {
  return (
    <Image
      source={require('@/assets/images/sertton-logo.png')}
      resizeMode='contain'
      w={96}
      h={48}
    />
  )
}
