// import { Truck } from 'phosphor-react-native'
// import { getTokens, XStack } from 'tamagui'

// import { ProcessedSku } from '@/@types/ProcessedSku'

// import { ShipmentServicesDialog } from '../ShipmentServicesDialog'

// import { useShipmentServices } from './useShipmentServices'

// import { Button } from '@/components/shared/Button'
// import { Input } from '@/components/shared/Input'
// import { SCREEN } from '@/utils/constants/screen'

// const BUTTON_WIDTH = 48
// const GAP = 8
// const INPUT_WIDTH = SCREEN.width - BUTTON_WIDTH - GAP - SCREEN.paddingX * 2

// type ShipmentServicesProps = {
//   product: ProcessedSku
// }

// export function ShipmentServices({ product }: ShipmentServicesProps) {
//   const {
//     shipmentServices,
//     zipcode,
//     handleZipcodeChange,
//     handleShipmentServicesDialogOpenChange,
//     handleCalculateShipmentServices,
//   } = useShipmentServices(product)

//   return (
//     <XStack gap={8} alignItems='flex-end' justifyContent='center'>
//       <Input
//         keyboardType='numeric'
//         w={INPUT_WIDTH}
//         label='Calcular frete'
//         placeholder='Ex.: 00000-0000'
//         value={zipcode}
//         onChangeText={handleZipcodeChange}
//         mask='cep'
//       />
//       <ShipmentServicesDialog
//         onOpenChange={handleShipmentServicesDialogOpenChange}
//         zipcode={zipcode}
//         shipmentServices={shipmentServices}
//       >
//         <Button
//           icon={<Truck size={24} color={getTokens().color.white.val} />}
//           w={BUTTON_WIDTH}
//           onPress={handleCalculateShipmentServices}
//         />
//       </ShipmentServicesDialog>
//     </XStack>
//   )
// }
