import { useEffect } from 'react'

import { useDebouncedCallback } from 'use-debounce'

export function useDebounce(
  callback: VoidFunction,
  delay = 500,
) {

  const debouncedCallback = useDebouncedCallback(callback, delay)

  useEffect(() => {

    return () => {
      debouncedCallback.cancel()
    }
  }, [debouncedCallback])

  return debouncedCallback
}