import { useState } from 'react'

import { Tab } from '.'

export function useTabs(tabs: Tab[]) {
  const [activeTab, setActiveTab] = useState(tabs[0].value)
  const containerSize = tabs.find((tab) => activeTab === tab.value)?.size ?? 300

  function handleTabPress(value: string) {
    setActiveTab(value)
  }

  return {
    activeTab,
    containerSize,
    handleTabPress,
  }
}
