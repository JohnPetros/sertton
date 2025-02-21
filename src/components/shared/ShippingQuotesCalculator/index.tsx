import { Truck } from 'phosphor-react-native'
import { getTokens, XStack } from 'tamagui'

import { ProcessedSku } from '@/@types/ProcessedSku'

import { Button } from '@/components/shared/Button'
import { Input } from '@/components/shared/Input'
import { SCREEN } from '@/utils/constants/screen'
import { useShippingQuotesCalculator } from './useShippingQuotesCalculator'
import { ShippingQuotesDialog } from './ShippingQuotesDialog'

const BUTTON_WIDTH = 48
const GAP = 8
const INPUT_WIDTH = SCREEN.width - BUTTON_WIDTH - GAP - SCREEN.paddingX * 2

type ShipmentServicesProps = {
  sku: ProcessedSku
}

export function ShippingQuotesCalculator({ sku }: ShipmentServicesProps) {
  const {
    shippingQuotes,
    zipcode,
    handleZipcodeChange,
    handleShipmentServicesDialogOpenChange,
    handleCalculateShipmentServices,
  } = useShippingQuotesCalculator(sku)

  return (
    <XStack gap={8} alignItems='flex-end' justifyContent='center'>
      <Input
        testID='zipcode-input'
        keyboardType='numeric'
        w={INPUT_WIDTH}
        label='Calcular frete'
        placeholder='Ex.: 00000-0000'
        value={zipcode}
        onChangeText={handleZipcodeChange}
        mask='cep'
      />
      <ShippingQuotesDialog
        onOpenChange={handleShipmentServicesDialogOpenChange}
        zipcode={zipcode}
        shippingQuotes={shippingQuotes}
      >
        <Button
          testID='calculate-button'
          icon={<Truck size={24} color={getTokens().color.white.val} />}
          w={BUTTON_WIDTH}
          onPress={handleCalculateShipmentServices}
        />
      </ShippingQuotesDialog>
    </XStack>
  )
}
