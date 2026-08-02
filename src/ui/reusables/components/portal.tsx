import { Portal as PrimitivePortal } from "@rn-primitives/portal"
import type { ComponentProps } from "react"

export const Portal = (props: ComponentProps<typeof PrimitivePortal>) => {
  return <PrimitivePortal {...props} />
}
