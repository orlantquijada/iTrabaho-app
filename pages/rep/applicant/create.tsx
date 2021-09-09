import { useController, useForm } from 'react-hook-form'
import { Page, Button, Radio, Input } from '@geist-ui/react'

import { Flex, FormField, Grid, TextField } from '@/components'
import { gridStyles } from '@/components/Grid'
import { styled } from '@/stitches.config'

const required = { required: 'Please fill out this field' }

interface FormFields {
  fname: string
  lname: string
  phoneNumber: string
  sex: 'M' | 'F'
  birthdate: string
}

export default function CreateApplicantPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    mode: 'onTouched',
    shouldUseNativeValidation: false,
  })

  const { field } = useController({
    name: 'sex',
    control,
    rules: required,
  })

  return (
    <Page>
      <Form
        noValidate
        action="POST"
        onSubmit={handleSubmit((values) => {
          const body: typeof values = {
            ...values,
            phoneNumber: values.phoneNumber.replaceAll(' ', ''),
          }
          alert(JSON.stringify(body, null, 2))
        })}
        gapY="4"
      >
        <Flex gap="4">
          <FormField title="First Name" error={errors.fname?.message}>
            <Input
              placeholder="John"
              type={errors.fname?.message ? 'error' : 'default'}
              clearable
              {...register('fname', required)}
            />
          </FormField>
          <FormField title="Last Name" error={errors.lname?.message}>
            <Input
              placeholder="Doe"
              type={errors.lname?.message ? 'error' : 'default'}
              clearable
              {...register('lname', required)}
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

        <Grid>
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
        </Grid>

        <Button type="secondary" htmlType="submit">
          Create
        </Button>
      </Form>
    </Page>
  )
}

const Form = styled('form', gridStyles, {
  width: 'fit-content',
})
