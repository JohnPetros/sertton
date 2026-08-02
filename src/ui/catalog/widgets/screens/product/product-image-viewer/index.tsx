import { Maximize2, X } from "lucide-react-native"
import { Pressable, View } from "react-native"

import { AnimatedModal } from "@/ui/shared/widgets/animated-modal"
import { AppText } from "@/ui/shared/widgets/app-text"
import { ImageFallback } from "@/ui/shared/widgets/image-fallback"

import { useProductImageViewer } from "./use-product-image-viewer"

interface ProductImageViewerProps {
  readonly imageUrl?: string
  readonly productName: string
}

export const ProductImageViewer = ({ imageUrl, productName }: ProductImageViewerProps) => {
  const { closeZoom, isZoomOpen, openZoom } = useProductImageViewer()

  return (
    <>
      <Pressable
        accessibilityLabel={`Ampliar imagem de ${productName}`}
        accessibilityRole="button"
        className="relative h-80 overflow-hidden rounded-2xl bg-muted/30"
        onPress={openZoom}
      >
        <ImageFallback
          accessibilityLabel={`Imagem de ${productName}`}
          className="h-full w-full"
          resizeMode="contain"
          source={imageUrl}
        />
        <View className="absolute left-3 top-3 flex-row items-center gap-2 rounded-full bg-black/65 px-3 py-2">
          <Maximize2 color="#ffffff" size={16} />
          <AppText className="text-xs font-semibold text-white">Pressione para zoom</AppText>
        </View>
      </Pressable>
      <AnimatedModal
        backdropClassName="bg-black"
        contentClassName="flex-1 items-center justify-center"
        visible={isZoomOpen}
        onRequestClose={closeZoom}
      >
        <ImageFallback
          accessibilityLabel={`Imagem ampliada de ${productName}`}
          className="h-full w-full"
          resizeMode="contain"
          source={imageUrl}
        />
        <Pressable
          accessibilityLabel="Fechar imagem ampliada"
          accessibilityRole="button"
          className="absolute right-6 top-14 rounded-full bg-white/20 p-3"
          onPress={closeZoom}
        >
          <X color="#ffffff" size={26} />
        </Pressable>
      </AnimatedModal>
    </>
  )
}
