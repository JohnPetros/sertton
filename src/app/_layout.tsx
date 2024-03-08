import { useEffect } from 'react'
import ErrorBoundary from 'react-native-error-boundary'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'

import { injectHttpProvider } from '@/services/api/http'

import { StyledSafeAreaView } from '@/components/shared/StyledSafeAreaView'

import { Providers } from '../providers'
import StackLayout from './(stack)/_layout'

import { AxiosHttpProvider } from '@/services/api/http/axios'
import { injectDateProvider } from '@/services/date'
import { DayjsDateProvider } from '@/services/date/dayjs'
import { injectValidationProvider } from '@/services/validation'
import { ZodValidationProvider } from '@/services/validation/zod'
import { MmkvStorageProvider } from '@/services/storage/mmkv'
import { injectStorageProvider } from '@/services/storage'

import { useAppError } from '@/utils/hooks/useAppError'
import { AppError } from '@/components/shared/AppError'

export { ErrorBoundary } from 'expo-router'

injectHttpProvider(AxiosHttpProvider)
injectStorageProvider(MmkvStorageProvider)
injectValidationProvider(ZodValidationProvider)
injectDateProvider(DayjsDateProvider)

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  const colorScheme = useColorScheme()

  const { handleAppError } = useAppError()


  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return <Providers>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StyledSafeAreaView>
        <ErrorBoundary onError={handleAppError} FallbackComponent={AppError}>
          <StackLayout />
        </ErrorBoundary>
      </StyledSafeAreaView>
    </ThemeProvider>
  </Providers >
}
