import { useFullImage } from '../../useFullImage'

const closeMock = jest.fn()
const openMock = jest.fn()

export function useFullImageMock(
  returnMock?: Partial<ReturnType<typeof useFullImage>>,
) {
  jest.mocked(useFullImage).mockReturnValueOnce({
    close: closeMock,
    open: openMock,
    animatedStyle: { transform: [{ translateX: 100 }] },
    ...returnMock,
  })

  return {
    closeMock,
  }
}
