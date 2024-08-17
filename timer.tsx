import {
  Button,
  Container,
  FormControl,
  Input,
} from "@chakra-ui/react"
import {
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"

import useTimer, { TimerInput } from "../hooks/useTimer"
import { isLoggedIn

 } from "../hooks/useAuth"
export const Route = createFileRoute("/timer")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function Login() {
  const { timerMutation, error, resetError } = useTimer()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TimerInput>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      timerInSeconds: 0,
    },
  })

  const onSubmit: SubmitHandler<TimerInput> = async (data) => {
    if (isSubmitting) return

    resetError()

    try {
      await timerMutation.mutateAsync(data)
    } catch {
      // error is handled by useAuth hook
    }
  }

  return (
    <>
      <Container
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        h="100vh"
        maxW="sm"
        alignItems="stretch"
        justifyContent="center"
        gap={4}
        centerContent
      >
        <FormControl id="timerInSeconds" isInvalid={!!error}>
          <Input
            id="timerInSeconds"
            placeholder="Time limit"
            type="number"
            required
          />
        </FormControl>
        <Button variant="primary" type="submit" isLoading={isSubmitting}>
          Create Timer
        </Button>
      </Container>
    </>
  )
}
