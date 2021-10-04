import { FormFields } from '@/components/RecruiterSignupForm/helpers'
import SignUpFormView from '@/components/RecruiterSignupForm/SignUpFormView'
import { useForm } from 'react-hook-form'

export default function RecruiterSignUpPage() {
  const methods = useForm<FormFields>({ mode: 'onTouched' })

  return <SignUpFormView methods={methods} />
}
