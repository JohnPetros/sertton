import { Sidebar } from '@/components/layout/Sidebar'
import { Drawer } from 'expo-router/drawer'

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={() => <Sidebar />}>
      <Drawer.Screen name='(tabs)' options={{ headerShown: false, swipeEdgeWidth: 0 }} />
    </Drawer>
  )
}
