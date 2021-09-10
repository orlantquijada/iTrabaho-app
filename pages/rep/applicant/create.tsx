import { useController, useForm } from 'react-hook-form'
import { Page, Button, Radio, Input, Text, Select, Card } from '@geist-ui/react'

import { Flex, FormField, Grid, TextField } from '@/components'
import { gridStyles } from '@/components/Grid'
import { styled } from '@/stitches.config'

const required = { required: 'Please fill out this field' }

interface FormFields {
  firstName: string
  lastName: string
  phoneNumber: string
  sex: 'M' | 'F'
  birthdate: string

  yearsOfExperience: number
  highestEducationAttained: string
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

  const { field: educationField } = useController({
    name: 'highestEducationAttained',
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
      >
        <SectionTitle h1 hasMarginTop>
          Personal Details
        </SectionTitle>
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
        </Grid>

        <SectionTitle h1>Work</SectionTitle>
        <Grid gapX="4" css={{ gridTemplateColumns: '70% auto' }}>
          <FormField
            title="Highest Education Attained"
            error={errors.highestEducationAttained?.message}
            requirementLabel="optional"
          >
            <Select
              placeholder="Choose one"
              type={
                errors.highestEducationAttained?.message ? 'error' : 'default'
              }
              value={educationField.value}
              onChange={educationField.onChange}
            >
              <Select.Option value="primary">Primary</Select.Option>
              <Select.Option value="junior">Junior High School</Select.Option>
              <Select.Option value="senior">Senior High School</Select.Option>
              <Select.Option value="undergraduate">Undergraduate</Select.Option>
              <Select.Option value="graduate">Graduate</Select.Option>
              <Select.Option value="doctoral">Doctorial</Select.Option>
            </Select>
          </FormField>
          <FormField
            title="Years of Experience"
            error={errors.yearsOfExperience?.message}
          >
            <Input
              type={errors.yearsOfExperience?.message ? 'error' : 'default'}
              htmlType="number"
              min={0}
              {...register('yearsOfExperience', {
                ...required,
                valueAsNumber: true,
              })}
            />
          </FormField>
        </Grid>

        <SectionTitle h1>Employment History</SectionTitle>
        <Card hoverable>
          <Grid gapX="4" css={{ gridTemplateColumns: '70% auto' }}>
            <FormField
              title="Highest Education Attained"
              error={errors.highestEducationAttained?.message}
              requirementLabel="optional"
            >
              <Select
                placeholder="Choose one"
                type={
                  errors.highestEducationAttained?.message ? 'error' : 'default'
                }
                value={educationField.value}
                onChange={educationField.onChange}
              >
                <Select.Option value="primary">Primary</Select.Option>
                <Select.Option value="junior">Junior High School</Select.Option>
                <Select.Option value="senior">Senior High School</Select.Option>
                <Select.Option value="undergraduate">
                  Undergraduate
                </Select.Option>
                <Select.Option value="graduate">Graduate</Select.Option>
                <Select.Option value="doctoral">Doctorial</Select.Option>
              </Select>
            </FormField>
            <FormField
              title="Years of Experience"
              error={errors.yearsOfExperience?.message}
            >
              <Input
                type={errors.yearsOfExperience?.message ? 'error' : 'default'}
                htmlType="number"
                min={0}
                {...register('yearsOfExperience', {
                  ...required,
                  valueAsNumber: true,
                })}
              />
            </FormField>
          </Grid>
        </Card>

        <Button
          type="secondary"
          htmlType="submit"
          style={{ marginTop: '2rem' }}
        >
          Create
        </Button>
      </Form>
    </Page>
  )
}

const Form = styled('form', gridStyles, {
  width: 'fit-content',
})

const SectionTitle = styled(Text, {
  fontSize: '1.25rem',
  fontWeight: '600',
  marginBlock: '1em 0.5em',

  variants: {
    hasMarginTop: {
      true: {
        marginBlockStart: '0',
      },
    },
  },
})
