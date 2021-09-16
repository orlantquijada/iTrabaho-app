import { useForm } from 'react-hook-form'
import { FormField, Grid } from '@/components'
import { gridStyles } from '@/components/Grid'
import { styled } from '@/stitches.config'
import { FormFields, required } from '@/components/LoginForm/helpers'
import { Button, Input } from '@geist-ui/react'

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ mode: 'onTouched' })

  return (
    <Form
      noValidate
      action="POST"
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2))
      )}
    >
      <Grid gapY="4">
        <FormField title="Phone number" error={errors.phoneNumber?.message}>
          <Input
            placeholder="09XXXXXXXXX"
            type={errors.phoneNumber?.message ? 'error' : 'default'}
            {...register('phoneNumber', required)}
          />
        </FormField>
        <FormField title="Password" error={errors.password?.message}>
          <Input
            placeholder="*********"
            type={errors.password?.message ? 'error' : 'default'}
            {...register('password', required)}
          />
        </FormField>
      </Grid>
      <Button type="secondary" htmlType="submit" style={{ marginTop: '2rem' }}>
        Login
      </Button>
    </Form>
  )
}

const Form = styled('form', gridStyles, {
  width: 'fit-content',
})
