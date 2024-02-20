import type { Mask } from '@/@types/Mask'

import { mask as format } from 'react-native-mask-text'

import { MASKS } from '../constants/masks'

export function useMask(mask: Mask | undefined) {
  function maskValue(value: string) {
    if (mask) {
      return format(value, MASKS[mask])
    }

    return value
  }

  return maskValue
}
