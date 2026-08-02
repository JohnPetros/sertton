import { useEffect, useState } from "react"

const getRemainingTime = (): string => {
  const now = new Date()
  const nextDay = new Date(now)
  nextDay.setHours(24, 0, 0, 0)
  const remainingSeconds = Math.max(0, Math.floor((nextDay.getTime() - now.getTime()) / 1000))
  const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, "0")
  const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, "0")
  const seconds = String(remainingSeconds % 60).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export const useShortageTimeCounter = () => {
  const [remainingTime, setRemainingTime] = useState(getRemainingTime)

  useEffect(() => {
    const interval = setInterval(() => setRemainingTime(getRemainingTime()), 1000)
    return () => clearInterval(interval)
  }, [])

  return { remainingTime }
}
