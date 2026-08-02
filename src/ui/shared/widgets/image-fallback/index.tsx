import { ImageOff } from "lucide-react-native"
import { Image, type ImageProps, View } from "react-native"

interface ImageFallbackProps extends Omit<ImageProps, "source"> {
  readonly source?: string
}

export const ImageFallback = ({ source, ...props }: ImageFallbackProps) => {
  if (!source)
    return (
      <View className="items-center justify-center bg-muted">
        <ImageOff color="#6b7280" size={28} />
      </View>
    )
  return <Image accessibilityLabel="Imagem do produto" source={{ uri: source }} {...props} />
}
