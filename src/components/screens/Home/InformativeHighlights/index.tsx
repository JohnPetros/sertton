// import { ArrowLeft, ArrowRight } from 'phosphor-react-native'
// import { getTokens, Text, XStack } from 'tamagui'

// import { useInformativeHighlights } from './useInformativeHighlights'

// import { Button } from '@/components/shared/Button'
// import { SCREEN } from '@/utils/constants/screen'

// export function InformativeHighlights() {
//   const { swiperRef, handlePrev, handleNext } = useInformativeHighlights(
//     INFORMATIVE_HIGHLIGHTS.length - 1
//   )

//   return (
//     <XStack>
//       <Button
//         position="absolute"
//         top={-12}
//         left={-24}
//         zIndex={50}
//         background="transparent"
//         onPress={handlePrev}
//         icon={
//           <ArrowLeft
//             size={16}
//             weight="bold"
//             color={getTokens().color.gray800.val}
//           />
//         }
//       />
//       <SwiperFlatList
//         ref={swiperRef}
//         autoplay
//         autoplayDelay={2}
//         autoplayLoop
//         disableGesture
//         autoplayInvertDirection
//         data={INFORMATIVE_HIGHLIGHTS}
//         renderItem={({ item }) => {
//           const Icon = item.icon
//           return (
//             <XStack
//               key={item.text}
//               w={SCREEN.width}
//               alignItems="center"
//               justifyContent="center"
//               gap={8}
//               x={-24}
//             >
//               <Icon
//                 color={getTokens().color.blue500.val}
//                 size={24}
//                 weight="bold"
//               />
//               <Text color="$gray800" fontWeight="600" fontSize={14}>
//                 {item.text}
//               </Text>
//             </XStack>
//           )
//         }}
//       />
//       <Button
//         position="absolute"
//         top={-12}
//         right={-24}
//         zIndex={50}
//         background="transparent"
//         onPress={handleNext}
//         icon={
//           <ArrowRight
//             size={16}
//             weight="bold"
//             color={getTokens().color.gray800.val}
//           />
//         }
//       />
//     </XStack>
//   )
// }
