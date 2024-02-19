import { AllRoutes } from 'expo-router'
import { Icon, Lock, Scroll, User } from 'phosphor-react-native'
import { ROUTES } from 'src/utils/constants/routes'

type RouteButton = {
  title: string
  icon: Icon
  route: AllRoutes
}

export const ROUTE_BUTTONS: RouteButton[] = [
  {
    title: 'Politicas de privacidade',
    icon: Lock,
    route: '/(stack)/privacy-policy',
  },
  {
    title: 'Termos e condições',
    icon: Scroll,
    route: '/(stack)/terms-and-conditions',
  },
  {
    title: 'Sobre a Sertton Industrial',
    icon: User,
    route: '/(stack)/about',
  },
]
