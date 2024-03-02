import { Buildings, User } from 'phosphor-react-native'
import { ForwardedRef, forwardRef, useImperativeHandle } from 'react'

import { Paragraph, Spinner, YStack } from 'tamagui'

import { useDocumentDialog } from './useDocumentDialog'

import type { PersonType } from '@/@types/Customer'

import { Button } from '@/components/shared/Button'
import { Dialog } from '@/components/shared/Dialog'
import type { DialogRef } from '@/components/shared/Dialog/types/DialogRef'
import { Input } from '@/components/shared/Input'
import { Tabs } from '@/components/shared/Tabs'

type DocumentDialogProps = {
  onValidateDocument: (validatedDocument: string, personType: PersonType) => Promise<void>
}

const DocumentDialogComponent = (
  { onValidateDocument }: DocumentDialogProps,
  ref: ForwardedRef<DialogRef>
) => {
  const {
    cnpj,
    cpf,
    error,
    isLoading,
    dialogRef,
    open,
    close,
    handleCpfChange,
    handleCnpjChange,
    handleTabsChange,
    handleSubmit,
  } = useDocumentDialog(onValidateDocument)

  useImperativeHandle(ref, () => {
    return {
      close,
      open,
    }
  })

  return (
    <Dialog
      ref={dialogRef}
      title='Identifique-se'
      width={320}
      isLoading={isLoading}
      content={
        <YStack gap={24}>
          <Paragraph>
            Digite seu e-mail para buscarmos os pedidos vinculados a ele.
          </Paragraph>
          <Tabs
            label='Você deve digitar seu CPF ou CNPJ que foi usada para fazer o pedido.'
            onTabChange={handleTabsChange}
            tabs={[
              {
                title: 'Pessoa física',
                value: 'natural',
                icon: User,
                size: 180,
                content: (
                  <YStack mt={24}>
                    <Input
                      label='CPF'
                      keyboardType='numeric'
                      placeholder='00.000.000-00'
                      mask='cpf'
                      value={cpf}
                      autoFocus
                      onChangeText={handleCpfChange}
                      error={error}
                    />
                  </YStack>
                ),
              },
              {
                title: 'Pessoa jurídica',
                value: 'legal',
                icon: Buildings,
                size: 150,
                content: (
                  <YStack mt={24}>
                    <Input
                      label='CNPJ'
                      keyboardType='numeric'
                      placeholder='00.000.000/0000-00'
                      mask='cnpj'
                      value={cnpj}
                      autoFocus
                      onChangeText={handleCnpjChange}
                      error={error}
                    />
                  </YStack>
                ),
              },
            ]}
          />

          <Button onPress={handleSubmit}>
            {isLoading ? <Spinner color='$white' /> : 'Buscar pedidos'}
          </Button>
        </YStack>
      }
    >
      {null}
    </Dialog>
  )
}

export const DocumentDialog = forwardRef(DocumentDialogComponent)
