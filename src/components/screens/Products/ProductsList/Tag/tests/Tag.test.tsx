import { act, fireEvent, screen } from '@testing-library/react-native'
import { View } from 'tamagui'

import { Tag } from '..'
import { render } from '@/_tests_/customs/customRender'

const onPressMock = jest.fn()

const X = () => <View />

jest.mock('phosphor-react-native', () => ({
  X: () => {
    return <X />
  },
}))

const tag = {
  id: '1',
  title: 'title',
  onPress: onPressMock,
}

describe('Tag component', () => {
  it('should render title', () => {
    render(<Tag id={tag.id} title={tag.title} type='brand' onPress={tag.onPress} />)

    expect(screen.getByText(tag.title)).toBeTruthy()
  })

  it('should callback on press', () => {
    render(<Tag id={tag.id} title={tag.title} type='brand' onPress={tag.onPress} />)

    act(() => {
      fireEvent.press(screen.getByText(tag.title))
    })

    expect(tag.onPress).toHaveBeenCalledWith('brand', tag.id)
  })
})
