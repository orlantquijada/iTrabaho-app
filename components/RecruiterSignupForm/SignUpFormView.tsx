import { Component, createRef } from 'react'
import { Flex } from '@/components'
import { FormFields } from './helpers'
import { UseControllerReturn, UseFormReturn } from 'react-hook-form'
import { FormField, Grid } from '@/components'
import { required } from '@/components/ApplicantForm/helpers'
import { gridStyles } from '@/components/Grid'
import { styled } from '@/stitches.config'
import { Button, Input } from '@geist-ui/react'

type State = FormFields
interface Props {
  methods: UseFormReturn<FormFields>
  sexController: UseControllerReturn<FormFields, 'sex'>
}

export default class SignUpFormView extends Component<Props, State> {
  private passref: React.RefObject<HTMLInputElement> | string | null
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

  constructor(props) {
    super(props)
    this.passref = createRef()
    this.passref = this.props.methods.watch('password')
  }

  componentDidUpdate() {
    this.passref = this.props.methods.watch('password')
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

  signup(values: FormFields) {
    alert(JSON.stringify(values, null, 2))
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
          <Flex direction="column">
            <FormField
              title="Phone Number"
              error={this.props.methods.formState.errors.phoneNumber?.message}
            >
              <Input
                label="+639"
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
                clearable
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
                  this.props.methods.formState.errors.confirm_password?.type ===
                  'validate'
                    ? 'error'
                    : 'default'
                }
                clearable
                {...this.props.methods.register('confirm_password', {
                  required: true,
                  validate: (value) => {
                    if (value === this.passref) return true
                    else return 'Passwords do not match'
                  },
                })}
              />
            </FormField>
            {/* <FormField
              title="Sex"
              error={this.props.methods.formState.errors.sex?.message}
            >
              <Radio.Group
                value={this.props.sexController.field.value}
                onChange={this.props.sexController.field.onChange}
              >
                <Radio value="M">Male</Radio>
                <Radio value="F">Female</Radio>
              </Radio.Group>
            </FormField> */}
          </Flex>

          {/* <Grid columns="2" gap="4">
            <FormField title="Birthdate" requirementLabel="optional">
              <TextField
                type="date"
                {...this.props.methods.register('birthdate', {
                  valueAsDate: true,
                })}
              />
            </FormField>
            <FormField title="Company" requirementLabel="optional">
              <Input
                placeholder="Company A"
                clearable
                {...this.props.methods.register('company')}
              />
            </FormField>
          </Grid> */}
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
