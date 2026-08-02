export interface MidnightCountdown {
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly totalMilliseconds: number
}

export const getMidnightCountdown = (now = new Date()): MidnightCountdown => {
  const midnight = new Date(now)
  midnight.setHours(24, 0, 0, 0)

  const totalMilliseconds = Math.max(0, midnight.getTime() - now.getTime())
  const totalSeconds = Math.floor(totalMilliseconds / 1000)

  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    totalMilliseconds,
  }
}
