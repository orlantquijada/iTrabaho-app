import { Flex, FormField, Grid, TextField } from '@/components'
import { required } from '@/components/ApplicantForm/helpers'
import { gridStyles } from '@/components/Grid'
import { FormFields } from '@/components/RecruiterSignupForm/helpers'
import { styled } from '@/stitches.config'
import { Button, Input, Radio } from '@geist-ui/react'
import { useController, useForm } from 'react-hook-form'

export default function RecruiterSignUpPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({ mode: 'onTouched' })

  const { field } = useController({
    name: 'sex',
    control,
    rules: required,
  })

  return (
    <Form
      noValidate
      action="POST"
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2))
      )}
    >
      <Grid gapY="4">
        <Flex gap="4">
          <FormField title="First Name" error={errors.firstName?.message}>
            <Input
              placeholder="John"
              type={errors.firstName?.message ? 'error' : 'default'}
              clearable
              {...register('firstName', required)}
            />
          </FormField>
          <FormField title="Last Name" error={errors.lastName?.message}>
            <Input
              placeholder="Doe"
              type={errors.lastName?.message ? 'error' : 'default'}
              clearable
              {...register('lastName', required)}
            />
          </FormField>
        </Flex>
        <Grid flow="column" gap="4" css={{ gridTemplateColumns: '70% auto' }}>
          <FormField title="Phone Number" error={errors.phoneNumber?.message}>
            <Input
              label="+639"
              placeholder="922 283 3416"
              clearable
              type={errors.phoneNumber?.message ? 'error' : 'default'}
              {...register('phoneNumber', {
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

          <FormField title="Sex" error={errors.sex?.message}>
            <Radio.Group value={field.value} onChange={field.onChange}>
              <Radio value="M">Male</Radio>
              <Radio value="F">Female</Radio>
            </Radio.Group>
          </FormField>
        </Grid>

        <Grid columns="2" gap="4">
          <FormField title="Birthdate" error={errors.birthdate?.message}>
            <TextField
              type="date"
              status={errors.birthdate?.message ? 'error' : undefined}
              {...register('birthdate', {
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
            <Input placeholder="Company A" clearable {...register('company')} />
          </FormField>
        </Grid>
      </Grid>
      <Button type="secondary" htmlType="submit" style={{ marginTop: '2rem' }}>
        Sign Up
      </Button>
    </Form>
  )
}

const Form = styled('form', gridStyles, {
  width: 'fit-content',
})
