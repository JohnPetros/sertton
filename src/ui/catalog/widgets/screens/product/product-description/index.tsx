import { View } from "react-native"

import { AppText } from "@/ui/shared/widgets/app-text"

import { useProductDescription } from "./use-product-description"

interface ProductDescriptionProps {
  readonly description: string
  readonly specifications: string
}

export const ProductDescription = ({ description, specifications }: ProductDescriptionProps) => {
  const { formattedDescription, formattedSpecifications } = useProductDescription(
    description,
    specifications,
  )

  return (
    <View className="gap-8 border-t border-border pt-8">
      {formattedDescription ? (
        <View className="gap-3">
          <AppText className="text-center text-2xl font-extrabold">Descrição do produto</AppText>
          <AppText className="text-justify leading-6 text-muted-foreground">
            {formattedDescription}
          </AppText>
        </View>
      ) : null}
      {formattedSpecifications ? (
        <View className="gap-3">
          <AppText className="text-center text-2xl font-extrabold">Especificações técnicas</AppText>
          <AppText className="text-justify leading-10 text-muted-foreground">
            {formattedSpecifications}
          </AppText>
        </View>
      ) : null}
    </View>
  )
}
