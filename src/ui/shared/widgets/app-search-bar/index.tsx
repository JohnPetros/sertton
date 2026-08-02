import { Search, X } from "lucide-react-native"
import { Pressable, View } from "react-native"

import { Input } from "@/ui/reusables/components/input"

interface AppSearchBarProps {
  readonly onChangeText: (value: string) => void
  readonly onSubmit?: () => void
  readonly placeholder?: string
  readonly value: string
}

export const AppSearchBar = ({
  onChangeText,
  onSubmit,
  placeholder = "Buscar produtos",
  value,
}: AppSearchBarProps) => {
  return (
    <View className="flex-row items-center rounded-md border border-border bg-background px-3">
      <Search color="#6b7280" size={20} />
      <Input
        accessibilityLabel={placeholder}
        className="min-h-12 flex-1 rounded-none border-0 bg-transparent px-3 text-base text-foreground"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        returnKeyType="search"
        value={value}
      />
      {value ? (
        <Pressable
          accessibilityLabel="Limpar busca"
          accessibilityRole="button"
          onPress={() => onChangeText("")}
        >
          <X color="#6b7280" size={20} />
        </Pressable>
      ) : null}
    </View>
  )
}
