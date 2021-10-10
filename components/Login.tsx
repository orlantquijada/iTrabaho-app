import { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormFields } from '@/components/LoginForm/helpers'
import LoginFormView from '@/components/LoginForm/LoginFormView'
import { login } from '@/utils/hooks/useUser'

export default function Login({
  setLoginModalState,
}: {
  setLoginModalState: Dispatch<SetStateAction<boolean>>
}) {
  const methods = useForm<FormFields>({ mode: 'onTouched' })
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = methods.handleSubmit(async (values) => {
    setIsSubmitting(true)

    await login(values)
      .then(() => window.location.reload())
      .catch(() => {
        setSubmitError('Invalid phone number or password.')
        setLoginModalState(true)
        methods.reset()
      })
      .finally(() => setIsSubmitting(false))
  })

  return (
    <LoginFormView
      methods={methods}
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitError={submitError}
    />
  )
}
