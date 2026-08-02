import { formatCurrency } from "@/core/shared/rules/formatters"
import { AppText } from "@/ui/shared/widgets/app-text"

interface PriceProps {
  readonly discountPrice?: number
  readonly salePrice: number
}

export const Price = ({ discountPrice, salePrice }: PriceProps) => {
  const hasDiscount = discountPrice !== undefined && discountPrice < salePrice

  return (
    <>
      {hasDiscount ? (
        <AppText className="text-md text-muted-foreground line-through">
          {formatCurrency(salePrice)}
        </AppText>
      ) : null}
      <AppText className="text-lg font-bold text-primary">
        {formatCurrency(hasDiscount ? discountPrice : salePrice)}
      </AppText>
    </>
  )
}
