import * as Linking from 'expo-linking'
import { Eye } from 'phosphor-react-native'
import { Button, Text, XStack, getTokens } from 'tamagui'

interface LinkProps {
  children: string
  url: string
}

export function Link({ children, url }: LinkProps) {
  return (
    <Button unstyled onPress={() => Linking.openURL(url)}>
      <XStack gap={4} alignItems='center'>
        <Eye color={getTokens().color.blue400.val} />
        <Text color='$blue400' fontWeight='600'>
          {children}
        </Text>
      </XStack>
    </Button>
  )
}
