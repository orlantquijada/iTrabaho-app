import { FormFields, required } from '@/components/RecruiterSignupForm/helpers'
import SignUpFormView from '@/components/RecruiterSignupForm/SignUpFormView'
import { useController, useForm } from 'react-hook-form'

export default function RecruiterSignUpPage() {
  const methods = useForm<FormFields>({ mode: 'onTouched' })

  const sexController = useController({
    name: 'sex',
    control: methods.control,
    rules: required,
  })

  return <SignUpFormView methods={methods} sexController={sexController} />
}
