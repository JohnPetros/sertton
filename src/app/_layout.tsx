import { useFonts } from 'expo-font'
import { useEffect } from 'react'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { useColorScheme } from 'react-native'

import { TamaguiProvider } from '@/providers/TamaguiProvider'

import { injectHttpProvider } from '@/services/api/http'
import { AxiosHttpProvider } from '@/services/api/http/axios'

import { Providers } from '../providers'
import StackLayout from './(stack)/_layout'

export { ErrorBoundary } from 'expo-router'

injectHttpProvider(AxiosHttpProvider)

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
        {/* <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='modal' options={{ presentation: 'modal' }} />
        </Stack> */}
        <StackLayout />
      </ThemeProvider>
    </Providers>
  )
}
