import { Dimensions } from 'react-native'
import { TAB_BAR_HEIGHT } from './tab-bar-height'

const { width, height } = Dimensions.get('window')

export const SCREEN = {
  width,
  height,
  paddingX: 24,
  paddingBottom: TAB_BAR_HEIGHT * 2,
}
