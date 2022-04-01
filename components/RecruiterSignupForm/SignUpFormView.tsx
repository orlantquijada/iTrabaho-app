import { Component } from 'react'
import { Flex } from '@/components'
import { FormFields } from './helpers'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { FormField, Grid } from '@/components'
import { required } from '@/components/ApplicantForm/helpers'
import { gridStyles } from '@/components/Grid'
import { styled } from '@/stitches.config'
import { Button, Input } from '@geist-ui/react'
import { signup } from '@/utils/hooks/useUser'

type State = FormFields

interface Props {
  methods: UseFormReturn<FormFields>
}

export default class SignUpFormView extends Component<Props, State> {
  state: State = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    sex: undefined,
    birthdate: '',
    company: '',
    password: '',
    confirm_password: '',
  }

  getFirstName() {
    return this.state.firstName
  }

  getLastName() {
    return this.state.lastName
  }

  getPhoneNumber() {
    return this.state.phoneNumber
  }

  getSex() {
    return this.state.sex
  }

  getBirthDate() {
    return this.state.birthdate
  }

  getCompany() {
    return this.state.company
  }

  getPassword() {
    return this.state.password
  }

  validateForm() {
    const validations = [
      Boolean(this.getFirstName()),
      Boolean(this.getLastName()),
      Boolean(this.getPhoneNumber()),
      this.getSex() === 'M' || this.getSex() === 'F',
    ]

    return validations.some((valid) => !valid)
  }

  signup: SubmitHandler<FormFields> = async (values: FormFields) => {
    signup(values).then(() => window.location.reload())
  }
  render() {
    return (
      <Form
        noValidate
        action="POST"
        onSubmit={this.props.methods.handleSubmit(this.signup)}
      >
        <Grid gapY="4">
          <Flex gap="4">
            <FormField
              title="First Name"
              error={this.props.methods.formState.errors.firstName?.message}
            >
              <Input
                placeholder="John"
                type={
                  this.props.methods.formState.errors.firstName?.message
                    ? 'error'
                    : 'default'
                }
                clearable
                {...this.props.methods.register('firstName', required)}
              />
            </FormField>
            <FormField
              title="Last Name"
              error={this.props.methods.formState.errors.lastName?.message}
            >
              <Input
                placeholder="Doe"
                type={
                  this.props.methods.formState.errors.lastName?.message
                    ? 'error'
                    : 'default'
                }
                clearable
                {...this.props.methods.register('lastName', required)}
              />
            </FormField>
          </Flex>
          <FormField
            title="Phone Number"
            error={this.props.methods.formState.errors.phoneNumber?.message}
          >
            <Input
              // label="+63"
              placeholder="922 283 3416"
              clearable
              width="100%"
              type={
                this.props.methods.formState.errors.phoneNumber?.message
                  ? 'error'
                  : 'default'
              }
              {...this.props.methods.register('phoneNumber', {
                ...required,
                minLength: {
                  message: 'Please fill in a valid Phone Number',
                  value: 10,
                },
                maxLength: {
                  message: 'Please fill in a valid Phone Number',
                  value: 12,
                },
              })}
            />
          </FormField>

          <FormField
            title="Password"
            error={this.props.methods.formState.errors.password?.message}
          >
            <Input.Password
              width="100%"
              type={
                this.props.methods.formState.errors.password?.message
                  ? 'error'
                  : 'default'
              }
              {...this.props.methods.register('password', required)}
            />
          </FormField>
          <FormField
            title="Confirm Password"
            error={
              this.props.methods.formState.errors.confirm_password?.message
            }
          >
            <Input.Password
              width="100%"
              type={
                this.props.methods.formState.errors.confirm_password?.message
                  ? 'error'
                  : 'default'
              }
              {...this.props.methods.register('confirm_password', {
                ...required,
                validate: (value) =>
                  value !== this.props.methods.getValues('password')
                    ? 'Passwords do not match'
                    : undefined,
              })}
            />
          </FormField>
        </Grid>
        <Button
          type="secondary"
          htmlType="submit"
          style={{ marginTop: '2rem' }}
        >
          Sign Up
        </Button>
      </Form>
    )
  }
}

const Form = styled('form', gridStyles)
