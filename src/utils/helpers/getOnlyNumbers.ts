import { REGEX } from '@/utils/constants/regex'

export function getOnlyNumbers(text: string): string {
  const numberRegex = REGEX.number
  return text.match(numberRegex)?.join('') ?? text
}
