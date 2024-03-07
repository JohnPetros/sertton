import { config as configBase } from '@tamagui/config'
import { createTamagui } from 'tamagui'
import { tokens } from './src/styles/tokens'

export const config = createTamagui({ ...configBase, tokens })

export default config

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf { }
}
