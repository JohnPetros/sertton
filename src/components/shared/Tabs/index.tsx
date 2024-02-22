import { Icon } from 'phosphor-react-native'
import { ReactNode } from 'react'

import { Tabs as T, Text, getTokens } from 'tamagui'

import { useTabs } from './useTabs'

const TAB_LIST_GAP = 8

export type Tab = {
  title: string
  value: string
  size: number
  icon?: Icon
  content: ReactNode
}

type TabsProps = {
  label: string
  tabs: Tab[]
  width?: number
  onTabChange?: (tab: string) => void
}

export function Tabs({ label, tabs, width, onTabChange }: TabsProps) {
  const { containerSize, activeTab, handleTabPress } = useTabs(tabs)

  return (
    <T
      testID='tablist'
      w={width}
      h={containerSize}
      defaultValue={tabs[0].value}
      value={activeTab}
      flexDirection='column'
      onValueChange={onTabChange}
    >
      <T.List
        borderWidth={1}
        borderColor='$gray500'
        borderRadius={4}
        justifyContent='center'
        alignItems='center'
        h={48}
        gap={TAB_LIST_GAP}
        w='100%'
        position='relative'
      >
        {tabs.map((tab, index) => {
          const Icon = tab.icon
          return (
            <T.Tab
              testID={`tab-${index + 1}`}
              unstyled
              key={tab.value}
              aria-label={label}
              value={tab.value}
              borderRadius={4}
              h={36}
              w={120}
              gap={4}
              onPress={() => handleTabPress(tab.value)}
              bg={activeTab === tab.value ? '$blue500' : '$white'}
            >
              {Icon && (
                <Icon
                  color={
                    getTokens().color[activeTab === tab.value ? 'white' : 'gray800'].val
                  }
                  size={16}
                />
              )}
              <Text
                color={activeTab === tab.value ? '$white' : '$gray800'}
                fontSize={12}
                fontWeight='600'
              >
                {tab.title}
              </Text>
            </T.Tab>
          )
        })}
      </T.List>

      {tabs.map((tab) => (
        <T.Content key={tab.value} value={tab.value}>
          {tab.content}
        </T.Content>
      ))}
    </T>
  )
}
