import { Component } from 'react'
import { Flex } from '@/components'
import { FormFields } from './helpers'
import { UseControllerReturn, UseFormReturn } from 'react-hook-form'
import { FormField, Grid, TextField } from '@/components'
import { required } from '@/components/ApplicantForm/helpers'
import { gridStyles } from '@/components/Grid'
import { styled } from '@/stitches.config'
import { Button, Input, Radio } from '@geist-ui/react'

type State = FormFields
interface Props {
  methods: UseFormReturn<FormFields>
  sexController: UseControllerReturn<FormFields, 'sex'>
}
export default class SignUpFormView extends Component<Props, State> {
  state: State = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    sex: undefined,
    birthdate: '',
    company: '',
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

  validateForm() {
    const validations = [
      Boolean(this.getFirstName()),
      Boolean(this.getLastName()),
      Boolean(this.getPhoneNumber()),
      Boolean(this.getSex()),
      Boolean(this.getSex() == 'M' || this.getSex() == 'F'),
      Boolean(this.getBirthDate()),
      Boolean(this.getCompany()),
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
          <Grid flow="column" gap="4" css={{ gridTemplateColumns: '70% auto' }}>
            <FormField
              title="Phone Number"
              error={this.props.methods.formState.errors.phoneNumber?.message}
            >
              <Input
                label="+639"
                placeholder="922 283 3416"
                clearable
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
            </FormField>
          </Grid>

          <Grid columns="2" gap="4">
            <FormField
              title="Birthdate"
              error={this.props.methods.formState.errors.birthdate?.message}
            >
              <TextField
                type="date"
                status={
                  this.props.methods.formState.errors.birthdate?.message
                    ? 'error'
                    : undefined
                }
                {...this.props.methods.register('birthdate', {
                  ...required,
                  validate: (v) => {
                    if (isNaN(Date.parse(v))) return 'Please fill in this field'
                    return undefined
                  },
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
          </Grid>
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

const Form = styled('form', gridStyles, {
  width: 'fit-content',
})
