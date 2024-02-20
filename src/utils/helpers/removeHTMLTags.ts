import { REGEX } from '@/utils/constants/regex'

export function removeHTMLTags(text: string) {
  return text.replace(REGEX.htmlTags, '')
}
