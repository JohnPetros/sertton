// import { StyleSheet } from 'react-native'
// // import { ReText } from 'react-native-redash'
// import { getTokens, Text, XStack } from 'tamagui'

// import { useTimer } from './useTimer'

// type TimerProps = {
//   initialHours: number
//   initialMinutes: number
//   initialSeconds: number
//   fontSize?: number
//   color?: 'primary' | 'secondary'
// }

// export function Timer({
//   initialHours,
//   initialMinutes,
//   initialSeconds,
//   fontSize = 24,
//   color = 'primary',
// }: TimerProps) {
//   const { animatedHoursText, animatedMinutesText, animatedSecondsText } =
//     useTimer({ initialHours, initialMinutes, initialSeconds })

//   const colorToken = color === 'primary' ? 'blue500' : 'white'

//   const reTextStyle = StyleSheet.create({
//     style: {
//       fontSize,
//       fontWeight: '600',
//       color: getTokens().color[colorToken].val,
//     },
//   })

//   return (
//     <XStack alignItems="center" justifyContent="center" gap={2}>
//       <ReText style={reTextStyle.style} text={animatedHoursText} />
//       <Text color={`$${colorToken}`} fontWeight="600" fontSize={fontSize}>
//         :
//       </Text>
//       <ReText style={reTextStyle.style} text={animatedMinutesText} />
//       <Text color={`$${colorToken}`} fontWeight="600" fontSize={fontSize}>
//         :
//       </Text>
//       <ReText style={reTextStyle.style} text={animatedSecondsText} />
//     </XStack>
//   )
// }
