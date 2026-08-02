import { Image, View } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"

import { AppText } from "@/ui/shared/widgets/app-text"
import { useSplashScreen } from "./use-splash-screen"

export const SplashScreen = () => {
  useSplashScreen()
  return (
    <View className="flex-1 items-center justify-center bg-primary">
      <Animated.View entering={FadeIn.duration(350)} className="items-center gap-5">
        <Image
          accessibilityLabel="Logotipo Sertton"
          className="h-24 w-24"
          source={require("../../../../../../assets/images/sertton-icon.png")}
        />
        <AppText className="text-3xl font-bold text-primary-foreground">Sertton</AppText>
        <AppText className="text-primary-foreground">Soluções para a indústria</AppText>
      </Animated.View>
    </View>
  )
}
