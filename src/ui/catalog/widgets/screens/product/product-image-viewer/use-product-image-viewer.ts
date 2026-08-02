import { useCallback, useState } from "react"

export const useProductImageViewer = () => {
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const closeZoom = useCallback(() => setIsZoomOpen(false), [])
  const openZoom = useCallback(() => setIsZoomOpen(true), [])

  return { closeZoom, isZoomOpen, openZoom }
}
