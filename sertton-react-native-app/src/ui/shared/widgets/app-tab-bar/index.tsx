import { usePathname, useRouter } from "expo-router"
import { House, Search, ShoppingBag, ShoppingCart } from "lucide-react-native"
import { Pressable, Text, View } from "react-native"

import { selectCartItemCount, useCartStore } from "@/ui/checkout/stores/cart-store"

const tabs = [
  { icon: House, label: "Início", path: "/" },
  { icon: Search, label: "Catálogo", path: "/catalog" },
  { icon: ShoppingCart, label: "Carrinho", path: "/cart" },
  { icon: ShoppingBag, label: "Pedidos", path: "/orders" },
] as const

export const AppTabBar = () => {
  const itemCount = useCartStore(selectCartItemCount)
  const pathname = usePathname()
  const router = useRouter()

  return (
    <View className="flex-row items-center justify-between border-t border-border bg-background px-6 py-4">
      {tabs.map(({ icon: Icon, label, path }) => {
        const isActive =
          pathname === path || (path === "/catalog" && pathname.startsWith("/catalog"))
        const badgeCount = path === "/cart" ? itemCount : 0

        return (
          <Pressable
            key={path}
            accessibilityLabel={label}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            className={
              isActive
                ? "h-16 w-16 items-center justify-center rounded-xl bg-[#2F80FF]"
                : "h-16 w-16 items-center justify-center rounded-xl border-2 border-[#2F80FF] bg-background"
            }
            onPress={() => router.navigate(path)}
          >
            <View>
              {badgeCount ? (
                <View
                  className={`absolute -right-6 -top-6 z-10 h-8 w-8 items-center justify-center rounded-full ${
                    isActive ? "bg-background" : "bg-[#2F80FF]"
                  }`}
                >
                  <Text
                    className={`text-xl font-bold ${
                      isActive ? "text-[#2F80FF]" : "text-primary-foreground"
                    }`}
                  >
                    {badgeCount}
                  </Text>
                </View>
              ) : null}
              <Icon color={isActive ? "#ffffff" : "#2F80FF"} size={30} strokeWidth={2.25} />
            </View>
          </Pressable>
        )
      })}
    </View>
  )
}
