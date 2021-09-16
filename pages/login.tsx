import { useForm } from 'react-hook-form'
import { FormFields } from '@/components/LoginForm/helpers'
import LoginFormView from '@/components/LoginForm/LoginFormView'

export default function Login() {
  const methods = useForm<FormFields>({ mode: 'onTouched' })

  return <LoginFormView methods={methods} />
}
