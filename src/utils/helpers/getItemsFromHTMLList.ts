import { REGEX } from '@/utils/constants/regex'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

export function getItemsFromHTMLList(text: string) {
  const pattern = REGEX.htmlList
  const matches = text.match(pattern)
  return matches?.map((match) =>
    removeHTMLTags(match.replace(REGEX.htmlLiTag, ''))
  )
}
