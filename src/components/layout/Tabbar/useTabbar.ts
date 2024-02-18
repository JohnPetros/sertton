import { useRouter } from 'expo-router'

// import { useCartStore } from '@/stores/cartStore'

export function useTabbar() {
  const router = useRouter()
  // const cartItemsQuantity = useCartStore((store) => store.state.items.length)

  function handleTabButton(screen: string) {
    // router.push(`/(drawer)/(tabs)/${screen}`)
  }

  return {
    // cartItemsQuantity,
    handleTabButton,
  }
}
