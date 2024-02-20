import { IDate } from './types/IDate'

let date: IDate

export function injectDateProvider(DateProvider: () => IDate) {
  date = DateProvider()
}

export function useDate(): IDate {
  if (!date) {
    throw new Error('useDate Must be used with a date provider')
  }

  return date
}
