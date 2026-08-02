import { Tabs } from "expo-router"

import { AppTabBar } from "@/ui/shared/widgets/app-tab-bar"

export const TabsNavigation = () => {
  return <Tabs screenOptions={{ headerShown: false }} tabBar={() => <AppTabBar />} />
}
