import { MagnifyingGlass } from 'phosphor-react-native'
import { Spinner, XStack, getTokens } from 'tamagui'

import { Input } from '../Input'

import { useSearch } from './useSearch'

import { Button } from '@/components/shared/Button'
import { SCREEN } from '@/utils/constants/screen'
import { TEST_IDS } from './tests/constants/test-ids'

const BUTTON_WIDTH = 48
const GAP = 8
const INPUT_WIDTH = SCREEN.width - BUTTON_WIDTH - GAP - SCREEN.paddingX * 2

type SearchProps = {
  isFetching?: boolean
}

export function Search({ isFetching }: SearchProps) {
  const { handleSearch, setSearchValue, isLoading, searchValue } = useSearch(
    isFetching ?? false,
  )

  return (
    <XStack gap={GAP}>
      <Input
        testID={TEST_IDS.input}
        placeholder='Exemplo: Arremate'
        w={INPUT_WIDTH}
        label='Procurar produto'
        autoCorrect={false}
        value={searchValue}
        onSubmitEditing={handleSearch}
        onChangeText={setSearchValue}
      />
      <Button
        testID={TEST_IDS.button}
        w={BUTTON_WIDTH}
        background='primary'
        alignSelf='flex-end'
        onPress={() => (isLoading ? null : handleSearch())}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner testID={TEST_IDS.spinner} size='small' color='$white' />
        ) : (
          <MagnifyingGlass color={getTokens().color.white.val} />
        )}
      </Button>
    </XStack>
  )
}
