import { Mail } from "lucide-react-native"
import { Pressable, ScrollView, View } from "react-native"
import { SvgUri } from "react-native-svg"

import { Input } from "@/ui/reusables/components/input"
import { AppHeader } from "@/ui/shared/widgets/app-header"
import { AppText } from "@/ui/shared/widgets/app-text"
import { ErrorState } from "@/ui/shared/widgets/error-state"
import { ImageFallback } from "@/ui/shared/widgets/image-fallback"

import { ProductCard } from "./product-card"
import { useHomeScreen } from "./use-home-screen"

export const HomeScreen = () => {
  const {
    banners,
    collections,
    email,
    error,
    isLoading,
    isSubmitting,
    message,
    onSearch,
    payments,
    refresh,
    setEmail,
    subscribe,
  } = useHomeScreen()

  return (
    <View className="flex-1 bg-background">
      <AppHeader showSearch onSearch={onSearch} />
      <ScrollView contentContainerClassName="gap-8 pb-10">
        <View className="gap-8">
          {isLoading ? <AppText className="px-5">Carregando novidades...</AppText> : null}
          {error ? <ErrorState message={error} onRetry={refresh} /> : null}
          {collections.map(({ collection, products }, index) => (
            <View key={collection.id} className="gap-4">
              <AppText className="px-5 text-3xl font-bold">{collection.name}</AppText>
              {products.length ? <ProductCard products={products} /> : null}
              {!products.length ? (
                <AppText className="px-5 text-muted-foreground">
                  Nenhum produto disponível nesta coleção.
                </AppText>
              ) : null}
              {index < banners.length ? (
                <ImageFallback
                  className="h-52 w-full"
                  resizeMode="cover"
                  source={banners[index]?.imageUrl}
                />
              ) : null}
            </View>
          ))}
          {collections.length === 0 && !isLoading
            ? banners.map((banner) => (
                <ImageFallback
                  key={banner.id}
                  className="h-52 w-full"
                  resizeMode="cover"
                  source={banner.imageUrl}
                />
              ))
            : null}
        </View>
        <View className="mx-5 gap-5 rounded-[28px] bg-[#2F73D9] px-7 py-10 shadow-lg">
          <View className="items-center gap-4">
            <View className="rounded-full bg-white/15 p-4">
              <Mail color="#ffffff" size={32} />
            </View>
            <AppText className="text-center text-3xl font-extrabold leading-6 text-primary-foreground">
              Receba novidades e ofertas incríveis
            </AppText>
            <AppText className="text-center text-lg leading-7 text-primary-foreground/85">
              Cadastre-se na nossa newsletter e fique por dentro dos lançamentos exclusivos da loja.
            </AppText>
          </View>
          {message ? (
            <AppText className="text-center font-semibold text-primary-foreground">
              {message}
            </AppText>
          ) : null}
          <Input
            accessibilityLabel="Digite seu melhor e-mail"
            className="h-14 rounded-xl border-0 bg-background px-4 text-lg text-foreground"
            keyboardType="email-address"
            onChangeText={setEmail}
            placeholder="Digite seu melhor e-mail"
            placeholderTextColor="#777784"
            testID="home-newsletter-input"
            value={email}
          />
          <Pressable
            accessibilityLabel="Inscreva-se na newsletter"
            accessibilityRole="button"
            className="h-14 items-center justify-center rounded-xl bg-background"
            disabled={isSubmitting}
            onPress={subscribe}
            testID="home-newsletter-submit"
          >
            <AppText className="text-2xl font-bold">
              {isSubmitting ? "Enviando..." : "Inscreva-se"}
            </AppText>
          </Pressable>
        </View>
        <View className="gap-6 border-t border-border bg-muted/20 px-6 py-10">
          <AppText className="text-center text-xs font-bold tracking-widest text-muted-foreground">
            FORMAS DE PAGAMENTO
          </AppText>
          <View className="flex-row flex-wrap justify-center gap-3">
            {payments.map((payment) => (
              <View
                key={payment.id}
                className="h-12 w-16 items-center justify-center rounded-md border border-border bg-background"
              >
                <SvgUri height={32} uri={payment.icon} width={48} />
              </View>
            ))}
          </View>
          <View className="my-2 border-t border-border" />
          <AppText className="text-center text-sm text-muted-foreground">
            Rua Tomatssu Iawasse 233 - Vila Nova Bonsucesso
          </AppText>
          <AppText className="text-center text-sm font-semibold">
            © {new Date().getFullYear()} Sertton Brasil Distribuidora Ltda
          </AppText>
          <AppText className="text-center text-sm text-muted-foreground">
            CNPJ: 33.805.461/0001-90
          </AppText>
        </View>
      </ScrollView>
    </View>
  )
}
