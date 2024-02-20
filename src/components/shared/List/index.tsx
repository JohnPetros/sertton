import { Circle } from 'phosphor-react-native'
import { ListItem, Text, YGroup, getTokens } from 'tamagui'

type ListProps = {
  items: string[]
  bgColor?: '$gray50' | '$white'
  isNumeric?: boolean
}

export function List({ items, bgColor = '$gray50', isNumeric = false }: ListProps) {
  return (
    <YGroup>
      {items.map((item, index) => (
        <YGroup.Item key={item}>
          <ListItem
            my={-4}
            px={0}
            fontSize={12}
            gap={8}
            alignItems='center'
            justifyContent='flex-start'
            bg={bgColor}
          >
            {isNumeric ? (
              <Text color='$gray800'>{index + 1}.</Text>
            ) : (
              <Circle size={8} color={getTokens().color.gray800.val} weight='fill' />
            )}
            <Text textAlign='left' flexWrap='wrap' flex={1}>
              {item}
            </Text>
          </ListItem>
        </YGroup.Item>
      ))}
    </YGroup>
  )
}
