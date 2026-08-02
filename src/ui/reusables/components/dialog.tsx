import { type ModalProps, View, type ViewProps } from "react-native"

import { cn } from "@/ui/reusables/utils"
import { AnimatedModal } from "@/ui/shared/widgets/animated-modal"

export const Dialog = ({ children, visible = false, ...props }: ModalProps) => {
  return (
    <AnimatedModal
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      contentClassName="flex-1"
      visible={visible}
      {...props}
    >
      {children}
    </AnimatedModal>
  )
}

export const DialogContent = ({ className, ...props }: ViewProps) => {
  return <View className={cn("m-6 rounded-lg bg-background p-5", className)} {...props} />
}
