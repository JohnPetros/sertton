import { Circle } from 'phosphor-react-native'
import { ListItem, Text, View, YGroup, getTokens } from 'tamagui'
import { TEST_IDS } from './tests/constants/test-ids'

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
              <View testID={`${TEST_IDS.circle}-${index}`}>
                <Circle size={8} color={getTokens().color.gray800.val} weight='fill' />
              </View>
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
