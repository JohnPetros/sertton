import { useToast as useToastNotifications } from 'react-native-toast-notifications'

type ToastType = 'success' | 'error' | 'warning'

export function useToast() {
  const toastNotifications = useToastNotifications()

  function show(message: string, type: ToastType = 'success', duration = 2000) {
    const toastNotificationTypes = {
      success: 'success',
      warning: 'warning',
      error: 'danger',
    }

    toastNotifications?.show(message, {
      type: toastNotificationTypes[type],
      placement: 'bottom',
      animationType: 'slide-in',
      duration,
    })
  }

  return {
    show,
  }
}
