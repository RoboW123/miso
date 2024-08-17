import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"

import { AxiosError } from "axios"
import {
  type ApiError,
  TimerService,
} from "../client"

const useTimer = () => {
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const createTimer = async (data: TimerInput) => {
    await TimerService.createTimer(data)
  }

  const timerMutation = useMutation({
    mutationFn: createTimer,
    onSuccess: () => {
      navigate({ to: "/timer" })
    },
    onError: (err: ApiError) => {
      let errDetail = (err.body as any)?.detail

      if (err instanceof AxiosError) {
        errDetail = err.message
      }

      if (Array.isArray(errDetail)) {
        errDetail = "Something went wrong"
      }

      setError(errDetail)
    },
  })


  return {
    timerMutation,
    error,
    resetError: () => setError(null),
  }
}

export type TimerInput = {
  timerInSeconds: number
}
export default useTimer
