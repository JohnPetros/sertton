import { router } from "expo-router"
import { type DrawerContentComponentProps, DrawerContentScrollView } from "expo-router/drawer"
import {
  Building2,
  FileText,
  LockKeyhole,
  Mail,
  Phone,
  RotateCcw,
  Send,
  X,
} from "lucide-react-native"
import { Pressable, View } from "react-native"

import { ExpoLinkProvider, openWhatsApp } from "@/providers/links/expo-link-provider"
import { AppText } from "@/ui/shared/widgets/app-text"

const closeThen = (navigation: DrawerContentComponentProps["navigation"], action: () => void) => {
  navigation.closeDrawer()
  requestAnimationFrame(action)
}

export const AppDrawer = ({ navigation }: DrawerContentComponentProps) => {
  const open = (url: string) =>
    closeThen(navigation, () => {
      void ExpoLinkProvider.open(url)
    })
  const navigate = (
    path:
      | "/institutional/privacy"
      | "/institutional/return"
      | "/institutional/terms"
      | "/institutional/about",
  ) => closeThen(navigation, () => router.navigate(path))
  const DrawerItem = ({
    icon: Icon,
    label,
    onPress,
  }: {
    readonly icon: typeof Mail
    readonly label: string
    readonly onPress: () => void
  }) => (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      className="flex-row items-center gap-4 rounded-md px-4 py-4"
      onPress={onPress}
    >
      <Icon color="#46a6d2" size={20} />
      <AppText>{label}</AppText>
    </Pressable>
  )

  return (
    <DrawerContentScrollView className="bg-background" contentContainerStyle={{ flex: 1 }}>
      <View className="flex-row items-center justify-between border-b border-border px-6 py-10">
        <AppText className="text-2xl font-bold text-primary">Sertton</AppText>
        <Pressable
          accessibilityLabel="Fechar menu"
          accessibilityRole="button"
          onPress={() => navigation.closeDrawer()}
        >
          <X color="#1f2937" size={24} />
        </Pressable>
      </View>
      <View className="flex-1 px-2 py-4">
        <AppText className="px-4 pb-2 text-xs font-semibold text-muted-foreground">
          FALE CONOSCO
        </AppText>
        <DrawerItem
          icon={Send}
          label="(12) 98823-3818"
          onPress={() =>
            closeThen(navigation, () => {
              void openWhatsApp(
                ExpoLinkProvider,
                "5512988233818",
                "Olá, gostaria de saber mais sobre a Sertton.",
              )
            })
          }
        />
        <DrawerItem icon={Phone} label="(11) 4968-2964" onPress={() => open("tel:551149682964")} />
        <DrawerItem
          icon={Mail}
          label="falecom@sertton.ind.br"
          onPress={() => open("mailto:falecom@sertton.ind.br")}
        />
        <View className="my-4 h-px bg-border" />
        <AppText className="px-4 pb-2 text-xs font-semibold text-muted-foreground">
          INSTITUCIONAL
        </AppText>
        <DrawerItem
          icon={LockKeyhole}
          label="Políticas de privacidade"
          onPress={() => navigate("/institutional/privacy")}
        />
        <DrawerItem
          icon={FileText}
          label="Termos e condições"
          onPress={() => navigate("/institutional/terms")}
        />
        <DrawerItem
          icon={RotateCcw}
          label="Política de devolução"
          onPress={() => navigate("/institutional/return")}
        />
        <DrawerItem
          icon={Building2}
          label="Sobre a Sertton Industrial"
          onPress={() => navigate("/institutional/about")}
        />
      </View>
    </DrawerContentScrollView>
  )
}
