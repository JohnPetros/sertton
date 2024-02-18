import { Linking } from 'react-native'

export function useContacts() {
  async function handleContactUrl(url: string) {
    await Linking.openURL(url)
  }

  return {
    handleContactUrl,
  }
}
