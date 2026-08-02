import { useCallback, useState } from "react"

interface UseAppHeaderParams {
  readonly onSearch?: (query: string) => void
}

export const useAppHeader = ({ onSearch }: UseAppHeaderParams) => {
  const [query, setQuery] = useState("")
  const submitSearch = useCallback(() => onSearch?.(query), [onSearch, query])

  return { query, setQuery, submitSearch }
}
