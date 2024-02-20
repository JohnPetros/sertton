import { ForwardedRef, ReactNode, forwardRef, useImperativeHandle } from 'react'
import { AlertDialog, XStack } from 'tamagui'

import { useAlert } from '@/components/shared/AlertDialog/useAlertDialog'
import { Button } from '@/components/shared/Button'

import { AlertDialogRef } from './types/AlertDialogRef'

type AlertProps = {
  title: string
  onConfirm: () => void
  onCancel?: () => void
  children?: ReactNode
}

export const AlertDialogComponent = (
  { onConfirm, onCancel, title, children: trigger }: AlertProps,
  ref: ForwardedRef<AlertDialogRef>
) => {
  const { open, close, handleOpenChange, isOpen } = useAlert(onCancel)

  useImperativeHandle(ref, () => {
    return {
      close,
      open,
    }
  })

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key='overlay'
          animation='quick'
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          testID='alert'
          bordered
          elevate
          key='content'
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -40, opacity: 0 }}
          exitStyle={{ x: 0, y: -40, opacity: 0 }}
          x={0}
          y={0}
          opacity={1}
          borderRadius={4}
          p={24}
          w={360}
          bg='$gray50'
        >
          <AlertDialog.Title
            fontSize={16}
            textAlign='center'
            lineHeight={24}
            color='$gray800'
          >
            {title}
          </AlertDialog.Title>
          <XStack
            testID='alert'
            alignItems='center'
            justifyContent='center'
            gap={12}
            mt={24}
          >
            <AlertDialog.Cancel asChild w={120}>
              <Button background='secondary'>Cancelar</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button onPress={() => onConfirm()} w={120}>
                Confirmar
              </Button>
            </AlertDialog.Action>
          </XStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
    </AlertDialog>
  )
}

const Component = forwardRef(AlertDialogComponent)

export { Component as AlertDialog }
