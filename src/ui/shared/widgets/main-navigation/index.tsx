import { Drawer } from "expo-router/drawer"

import { AppDrawer } from "@/ui/shared/widgets/app-drawer"

export const MainNavigation = () => {
  return (
    <Drawer
      drawerContent={(props) => <AppDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    />
  )
}
