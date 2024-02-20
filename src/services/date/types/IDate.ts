import type { DateFormat } from "./DateFormat"

export interface IDate {
  calculateTimeUtilTodayEnd: () => {
    hours: number
    minutes: number
    seconds: number
  }
  getDiffInSeconds: (currentDate: Date, futureDate: Date) => number
  format(date: Date, format: DateFormat): string
}
