import { useRef } from 'react'

import type { FullImageRef } from './FullImage/types/FullImageRef'

export function useProductImage() {
  const fullImageRef = useRef<FullImageRef | null>(null)

  function handleFullImage() {
    fullImageRef.current?.open()
  }

  return {
    fullImageRef,
    handleFullImage,
  }
}
