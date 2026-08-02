import { ArrowLeft, Menu, Search } from "lucide-react-native"
import { Image, Pressable, View } from "react-native"

import { Input } from "@/ui/reusables/components/input"
import { AppText } from "@/ui/shared/widgets/app-text"
import { useAppHeader } from "./use-app-header"

interface AppHeaderProps {
  readonly onBackPress?: () => void
  readonly onMenuPress?: () => void
  readonly onSearch?: (query: string) => void
  readonly showSearch?: boolean
  readonly title?: string
}

export const AppHeader = ({
  onBackPress,
  onMenuPress,
  onSearch,
  showSearch = false,
  title,
}: AppHeaderProps) => {
  const { query, setQuery, submitSearch } = useAppHeader({ onSearch })

  if (!showSearch)
    return (
      <View className="flex-row items-center gap-4 border-b border-border bg-background px-5 py-4">
        {onBackPress ? (
          <Pressable
            accessibilityLabel="Voltar"
            accessibilityRole="button"
            className="p-1"
            hitSlop={8}
            onPress={onBackPress}
          >
            <ArrowLeft color="#27272a" size={24} />
          </Pressable>
        ) : null}
        {!onBackPress && onMenuPress ? (
          <Pressable
            accessibilityLabel="Abrir menu"
            accessibilityRole="button"
            className="p-1"
            hitSlop={8}
            onPress={onMenuPress}
          >
            <Menu color="#27272a" size={24} />
          </Pressable>
        ) : null}
        <AppText className="text-xl font-bold">{title ?? "Sertton"}</AppText>
      </View>
    )

  return (
    <View className="gap-4 border-b border-border bg-background px-5 pb-4 pt-5">
      <View className="flex-row items-center justify-between">
        <Pressable
          accessibilityLabel="Abrir menu"
          accessibilityRole="button"
          className="p-1"
          hitSlop={8}
          onPress={onMenuPress}
        >
          <Menu color="#27272a" size={23} strokeWidth={2.5} />
        </Pressable>
        <Image
          accessibilityLabel="Logotipo Sertton Industrial"
          className="h-10 w-24"
          resizeMode="contain"
          source={require("../../../../../assets/images/sertton-logo.png")}
        />
      </View>
      <View className="gap-2">
        <AppText className="text-xs font-bold text-muted-foreground">PROCURAR PRODUTO</AppText>
        <View className="flex-row gap-1">
          <Input
            accessibilityLabel="Procurar produto"
            className="h-12 flex-1 rounded-md border border-border bg-muted/30 px-3 text-base text-foreground"
            onChangeText={setQuery}
            onSubmitEditing={submitSearch}
            placeholder="Exemplo: Arramate"
            placeholderTextColor="#8b8b96"
            returnKeyType="search"
            testID="home-search-input"
            value={query}
          />
          <Pressable
            accessibilityLabel="Pesquisar produto"
            accessibilityRole="button"
            className="h-12 w-14 items-center justify-center rounded-md bg-[#2F80FF]"
            onPress={submitSearch}
            testID="home-search-submit"
          >
            <Search color="#ffffff" size={25} strokeWidth={2.25} />
          </Pressable>
        </View>
      </View>
    </View>
  )
}
