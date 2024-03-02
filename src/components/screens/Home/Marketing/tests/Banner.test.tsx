import { render } from '@/_tests_/customs/customRender'

import { Banner } from '../Banner'
import { TEST_IDS } from './constants/test-ids'
import { screen } from '@testing-library/react-native'

describe('Banner component', () => {
  it('should have image url as prop', () => {
    const imageUrl = 'image.mock.com'

    render(<Banner imageUrl={imageUrl} />)

    const banner = screen.getByTestId(TEST_IDS.bannerImage)

    expect(banner.props.source.uri).toEqual('https://image.mock.com')
  })
})
