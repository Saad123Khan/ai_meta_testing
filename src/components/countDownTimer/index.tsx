"use client"

import { useState, useEffect } from "react"

const CountDownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 14,
    minutes: 45,
    seconds: 30
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime.days === 0 && prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer)
          return prevTime
        }

        let newSeconds = prevTime.seconds - 1
        let newMinutes = prevTime.minutes
        let newHours = prevTime.hours
        let newDays = prevTime.days

        if (newSeconds < 0) {
          newSeconds = 59
          newMinutes -= 1
        }

        if (newMinutes < 0) {
          newMinutes = 59
          newHours -= 1
        }

        if (newHours < 0) {
          newHours = 23
          newDays -= 1
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeBox = ({ value, unit }: { value: number; unit: string }) => (
    <div className="bg-blue-600 rounded-sm p-1 text-center w-[65px]"    style={{
        background: "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "10px",
        // border: "1px solid rgba(255, 255, 255, 0.18)", // Optional for more effect
      }}>
      <div className="text-white text-md font-bold">{value}</div>
      <div className="text-white text-[12px]">{unit}</div>
    </div>
  )

  return (
    <div className="flex justify-center">
      <div className="flex space-x-4" >
        <TimeBox value={timeLeft.days} unit="Days" />
        <TimeBox value={timeLeft.hours} unit="Hours" />
        <TimeBox value={timeLeft.minutes} unit="Minutes" />
        <TimeBox value={timeLeft.seconds} unit="Seconds" />
      </div>
    </div>
  )
}

export default CountDownTimer