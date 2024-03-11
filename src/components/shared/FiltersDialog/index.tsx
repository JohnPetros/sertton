import { ReactNode, useRef } from 'react'
import { FlatList } from 'react-native'
import { Text, YGroup, YStack } from 'tamagui'

import { useFiltersDialog } from './useFiltersDialog'

import type { Brand } from '@/@types/Brand'

import { Button } from '@/components/shared/Button'
import { Checkbox } from '@/components/shared/Checkbox'
import { Dialog } from '@/components/shared/Dialog'
import { DialogRef } from '../Dialog/types/DialogRef'

type FiltersDialogProps = {
  brands: Brand[]
  children: ReactNode
}

export function FiltersDialog({ children, brands }: FiltersDialogProps) {
  const dialogRef = useRef<DialogRef>(null)

  const {
    checkedBrandsIds,
    handleBrandCheckbox,
    handleDialogOpenChange,
    handleFilterButton,
  } = useFiltersDialog(brands, dialogRef)

  return (
    <Dialog
      ref={dialogRef}
      onOpenChange={handleDialogOpenChange}
      title='Filtrar por'
      width={320}
      content={
        <YStack mt={12} pb={12}>
          <YGroup>
            <YGroup.Item>
              <Text fontSize={16} fontWeight='600' color='$gray900' mb={4}>
                Marca
              </Text>
            </YGroup.Item>
            <FlatList
              data={brands}
              keyExtractor={(brand) => brand.id}
              renderItem={({ item }) => (
                <YGroup.Item key={item.id}>
                  <Checkbox
                    value={String(item.id)}
                    label={item.name}
                    onChange={handleBrandCheckbox}
                    defaultChecked={checkedBrandsIds.includes(item.id)}
                  />
                </YGroup.Item>
              )}
            />
          </YGroup>
          <Button onPress={handleFilterButton} mt={24}>
            Filtrar produtos
          </Button>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
