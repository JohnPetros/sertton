import { H2, Paragraph, YStack } from 'tamagui'

import { List } from '@/components/shared/List'
import { getItemsFromHTMLList } from '@/utils/helpers/getItemsFromHTMLList'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

type DescriptionProps = {
  description: string
  specifications: string
}

export function ProductDescription({ description, specifications }: DescriptionProps) {
  return (
    <>
      <YStack gap={12}>
        <H2 fontSize={24}>Descrição do produto</H2>
        <Paragraph lineHeight={28}>{removeHTMLTags(description)}</Paragraph>
      </YStack>
      <YStack>
        <H2 fontSize={24}>Especificações técnicas</H2>
        <List items={getItemsFromHTMLList(specifications) ?? []} />
      </YStack>
    </>
  )
}
