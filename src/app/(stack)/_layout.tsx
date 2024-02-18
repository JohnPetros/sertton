import { Stack } from 'expo-router'

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName='(drawer)'>
      <Stack.Screen name='splash' />
      <Stack.Screen name='about' />
      <Stack.Screen name='privacy-policy' />
      <Stack.Screen name='return-policy' />
      <Stack.Screen name='terms-and-conditions' />
      <Stack.Screen name='(drawer)' />
    </Stack>
  )
}
