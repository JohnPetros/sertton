import { Text, View } from 'react-native'

import { ProductItemProps } from '@/components/shared/ProductItem'

const FiltersDialog = () => <View />

jest.mock('@/components/shared/FiltersDialog', () => ({
  FiltersDialog: () => {
    return <FiltersDialog />
  },
}))
