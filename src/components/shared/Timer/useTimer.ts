import { useEffect, useState } from 'react'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'

type UseTimerParams = {
  initialHours: number
  initialMinutes: number
  initialSeconds: number
}

export function useTimer({
  initialHours,
  initialMinutes,
  initialSeconds,
}: UseTimerParams) {
  const [timerSeconds, setTimerSeconds] = useState(0)

  const hours = useSharedValue(initialHours)
  const minutes = useSharedValue(initialMinutes)
  const seconds = useSharedValue(initialSeconds)

  const animatedHoursText = useDerivedValue(() => {
    return `${hours.value}`.padStart(2, '0')
  })

  const animatedMinutesText = useDerivedValue(() => {
    return `${minutes.value}`.padStart(2, '0')
  })

  const animatedSecondsText = useDerivedValue(() => {
    return `${seconds.value}`.padStart(2, '0')
  })

  useEffect(() => {
    if (timerSeconds === -1) return

    const timer = setTimeout(() => {
      hours.value = Math.floor(timerSeconds / 60 / 60)
      minutes.value = Math.floor((timerSeconds / 60) % 60)
      seconds.value = timerSeconds % 60

      setTimerSeconds(timerSeconds - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timerSeconds])

  useEffect(() => {
    const timeSeconds =
      initialHours * 60 * 60 + initialMinutes * 60 + initialSeconds

    setTimerSeconds(timeSeconds)
  }, [])

  return {
    timerSeconds,
    animatedHoursText,
    animatedMinutesText,
    animatedSecondsText,
  }
}
