import { useCallback, useState } from "react"

export const useScaffoldScreen = () => {
  const [isHighlighted, setIsHighlighted] = useState(false)

  const toggleHighlight = useCallback(() => {
    setIsHighlighted((currentValue) => !currentValue)
  }, [])

  return {
    isHighlighted,
    toggleHighlight,
  }
}
