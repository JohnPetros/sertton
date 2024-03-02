import { EnvelopeSimple, Phone, WhatsappLogo } from 'phosphor-react-native'
import { ReactNode } from 'react'
import { Text, getTokens } from 'tamagui'
import { XStack } from 'tamagui'

import { ContactType } from '@/@types/Contact'
import { Button } from '@/components/shared/Button'
import { useContacts } from '@/components/shared/Contacts/useContacts'
import { CONTACTS } from './constants/contacts'

export function Contacts() {
  const { handleContactUrl } = useContacts()

  const CONTACT_ICONS: Record<ContactType, ReactNode> = {
    whatsapp: <WhatsappLogo color={getTokens().color.green600.val} />,
    landline: <Phone color={getTokens().color.gray600.val} />,
    email: <EnvelopeSimple color={getTokens().color.gray600.val} />,
  }

  return CONTACTS.map((contact) => (
    <Button
      testID={contact.url}
      key={contact.url}
      background='transparent'
      justifyContent='flex-start'
      px={0}
      onPress={() => handleContactUrl(contact.url)}
    >
      <XStack gap={4}>
        {CONTACT_ICONS[contact.type as ContactType]}
        <Text
          color={contact.type === 'whatsapp' ? '$green600' : '$gray600'}
          fontWeight='600'
          fontSize={14}
        >
          {contact.title}
        </Text>
      </XStack>
    </Button>
  ))
}
