import { useAccordion } from "../../useAccordion"

export function useAccordionMock(returnMock?: Partial<ReturnType<typeof useAccordion>>) {
  jest.mocked(useAccordion).mockReturnValueOnce({
    toggle: jest.fn(),
    containerAnimatedStyle: { backgroundColor: 'blue' },
    contentAnimatedStyle: { height: 100, overflow: 'hidden' },
    ...returnMock,
  })
}
