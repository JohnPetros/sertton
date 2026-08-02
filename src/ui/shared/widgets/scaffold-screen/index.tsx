import { Pressable, Text, View } from "react-native"
import Animated, { FadeIn, FadeOut } from "react-native-reanimated"

import { useScaffoldScreen } from "./use-scaffold-screen"

export const ScaffoldScreen = () => {
  const { isHighlighted, toggleHighlight } = useScaffoldScreen()

  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <Animated.View entering={FadeIn} exiting={FadeOut} className="items-center gap-3">
        <Text className="text-3xl font-bold text-foreground">Sertton</Text>
        <Text className="text-center text-muted-foreground">
          A nova experiência está sendo preparada.
        </Text>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: isHighlighted }}
          accessibilityLabel="Validar animação"
          className="rounded-md bg-primary px-4 py-3"
          onPress={toggleHighlight}
        >
          <Text className="font-semibold text-primary-foreground">
            {isHighlighted ? "Animação validada" : "Validar animação"}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  )
}
