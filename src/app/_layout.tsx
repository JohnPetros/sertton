import { useEffect } from 'react'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useColorScheme } from 'react-native'

import { useFonts } from 'expo-font'
import { SplashScreen } from 'expo-router'

import { injectHttpProvider } from '@/services/api/http'
import { AxiosHttpProvider } from '@/services/api/http/axios'

import { StyledSafeAreaView } from '@/components/shared/StyledSafeAreaView'

import { Providers } from '../providers'
import StackLayout from './(stack)/_layout'

import { injectDateProvider } from '@/services/date'
import { DayjsDateProvider } from '@/services/date/dayjs'
import { injectValidationProvider } from '@/services/validation'
import { ZodValidationProvider } from '@/services/validation/zod'
import { MmkvStorageProvider } from '@/services/storage/mmkv'
import { injectStorageProvider } from '@/services/storage'

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

  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  if (!interLoaded && !interError) {
    return null
  }

  return <RootLayoutNav />
}

function RootLayoutNav() {
  const colorScheme = useColorScheme()

  return (
    <Providers>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StyledSafeAreaView>
          {/* <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
        </Stack> */}
          <StackLayout />
        </StyledSafeAreaView>
      </ThemeProvider>
    </Providers>
  )
}
