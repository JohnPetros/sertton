import { AppHeader } from "@/ui/shared/widgets/app-header"
import { AppText } from "@/ui/shared/widgets/app-text"
import { ScrollView, View } from "react-native"

export type InstitutionalSection = {
   content: string
   title: string
}
type InstitutionalScreenProps = {
   sections:  InstitutionalSection[]
   title: string
}
export const InstitutionalScreen = ({ sections, title }: InstitutionalScreenProps) => (
  <View className="flex-1 bg-background">
    <AppHeader title={title} />
    <ScrollView contentContainerClassName="gap-5 px-5 py-6">
      {sections.map((section) => (
        <View key={section.title} className="gap-2">
          <AppText className="text-lg font-bold">{section.title}</AppText>
          <AppText className="leading-6 text-muted-foreground">{section.content}</AppText>
        </View>
      ))}
    </ScrollView>
  </View>
)
