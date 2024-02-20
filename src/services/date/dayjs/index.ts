import 'dayjs/locale/pt-br'

import dayjs from 'dayjs'

import { IDate } from '../types/IDate'

import type { DateFormat } from "../types/DateFormat"

dayjs.locale('pt-br')

export const DayjsDateProvider = (): IDate => {
  return {
    calculateTimeUtilTodayEnd() {
      const currentDate = dayjs()
      const todayEnd = currentDate.endOf('day')

      const difference = todayEnd.diff(currentDate)

      const hours = Math.floor(difference / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return {
        hours,
        minutes,
        seconds,
      }
    },

    format(date: Date, format: DateFormat) {
      return dayjs(date).format(format)
    },

    getDiffInSeconds(currentDate: Date, futureDate: Date): number {
      return dayjs(currentDate).diff(futureDate, 'second')
    },
  }
}
