import { Component } from 'react'
import { FormField, Grid } from '@/components'
import { gridStyles } from '@/components/Grid'
import { styled } from '@/stitches.config'
import { Button, Input } from '@geist-ui/react'
import { FormFields, required } from './helpers'
import { UseFormReturn } from 'react-hook-form'
import { login } from '@/utils/hooks/useUser'

type State = FormFields

interface Props {
  methods: UseFormReturn<FormFields>
}

export default class LoginForm extends Component<Props, State> {
  state: State = {
    phoneNumber: '',
    password: '',
  }

  getMobileNumber() {
    return this.state.phoneNumber
  }

  getPassword() {
    return this.state.password
  }
  login(values: FormFields) {
    login(values).then(() => window.location.reload())
  }
  validateForm() {
    const validations = [
      Boolean(this.getMobileNumber()),
      Boolean(this.getPassword()),
    ]

    return validations.some((valid) => !valid)
  }

  render() {
    return (
      <Form
        noValidate
        action="POST"
        onSubmit={this.props.methods.handleSubmit(this.login)}
      >
        <Grid gapY="4">
          <FormField
            title="Phone number"
            error={this.props.methods.formState.errors.phoneNumber?.message}
          >
            <Input
              width="100%"
              placeholder="09XXXXXXXXX"
              type={
                this.props.methods.formState.errors.phoneNumber?.message
                  ? 'error'
                  : 'default'
              }
              {...this.props.methods.register('phoneNumber', required)}
            />
          </FormField>
          <FormField
            title="Password"
            error={this.props.methods.formState.errors.password?.message}
          >
            <Input.Password
              width="100%"
              placeholder="*********"
              type={
                this.props.methods.formState.errors.password?.message
                  ? 'error'
                  : 'default'
              }
              {...this.props.methods.register('password', required)}
            />
          </FormField>
        </Grid>
        <Button
          type="secondary"
          htmlType="submit"
          style={{ marginTop: '2rem' }}
        >
          Login
        </Button>
      </Form>
    )
  }
}

const Form = styled('form', gridStyles)
