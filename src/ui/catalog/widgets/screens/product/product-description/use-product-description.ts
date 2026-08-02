import { useMemo } from "react"

const formatRichText = (value: string): string =>
  value
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n")
    .replace(/<br\s*\/?\s*>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

export const useProductDescription = (description: string, specifications: string) => {
  const formattedDescription = useMemo(() => formatRichText(description), [description])
  const formattedSpecifications = useMemo(() => formatRichText(specifications), [specifications])

  return { formattedDescription, formattedSpecifications }
}
