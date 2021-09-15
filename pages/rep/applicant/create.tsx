import { useController, useForm, FormProvider } from 'react-hook-form'
import { Page, Button, Radio, Input, Select } from '@geist-ui/react'

import { Flex, FormField, Grid, TextField } from '@/components'
import { gridStyles } from '@/components/Grid'
import { styled } from '@/stitches.config'
import { required, FormFields } from '@/components/ApplicantForm/helpers'
import Experience from '@/components/ApplicantForm/Experience'
import SectionTitle from '@/components/ApplicantForm/SectionTitle'

export default function CreateApplicantPage() {
  const methods = useForm<FormFields>({
    mode: 'onTouched',
    shouldUseNativeValidation: false,
    defaultValues: {
      experience: [{ details: [{}] }],
    },
  })

  const { field } = useController({
    name: 'sex',
    control: methods.control,
    rules: required,
  })

  const { field: educationField } = useController({
    name: 'highestEducationAttained',
    control: methods.control,
    rules: required,
  })

  return (
    <Page>
      <FormProvider {...methods}>
        <Form
          noValidate
          action="POST"
          onSubmit={methods.handleSubmit((values) => {
            const { experience } = values

            // parse endDate and startDate to startMonth and StartYear for each experience
            const parsedExperience = experience.map((exp) => {
              const { startDate: start, endDate: end } = exp
              const startDate = new Date(start)
              const endDate = new Date(end)
              const startMonth = startDate.getMonth() + 1
              const endMonth = endDate.getMonth() + 1
              const startYear = startDate.getFullYear()
              const endYear = endDate.getFullYear()

              return { ...exp, startMonth, startYear, endMonth, endYear }
            })

            const body: typeof values = {
              ...values,
              experience: parsedExperience,
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
              <FormField
                title="First Name"
                error={methods.formState.errors.firstName?.message}
              >
                <Input
                  placeholder="John"
                  type={
                    methods.formState.errors.firstName?.message
                      ? 'error'
                      : 'default'
                  }
                  clearable
                  {...methods.register('firstName', required)}
                />
              </FormField>
              <FormField
                title="Last Name"
                error={methods.formState.errors.lastName?.message}
              >
                <Input
                  placeholder="Doe"
                  type={
                    methods.formState.errors.lastName?.message
                      ? 'error'
                      : 'default'
                  }
                  clearable
                  {...methods.register('lastName', required)}
                />
              </FormField>
            </Flex>
            <Grid
              flow="column"
              gap="4"
              css={{ gridTemplateColumns: '70% auto' }}
            >
              <FormField
                title="Phone Number"
                error={methods.formState.errors.phoneNumber?.message}
              >
                <Input
                  label="+639"
                  placeholder="922 283 3416"
                  clearable
                  type={
                    methods.formState.errors.phoneNumber?.message
                      ? 'error'
                      : 'default'
                  }
                  {...methods.register('phoneNumber', {
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
                error={methods.formState.errors.sex?.message}
              >
                <Radio.Group value={field.value} onChange={field.onChange}>
                  <Radio value="M">Male</Radio>
                  <Radio value="F">Female</Radio>
                </Radio.Group>
              </FormField>
            </Grid>

            <Grid>
              <FormField
                title="Birthdate"
                error={methods.formState.errors.birthdate?.message}
              >
                <TextField
                  type="date"
                  status={
                    methods.formState.errors.birthdate?.message
                      ? 'error'
                      : undefined
                  }
                  {...methods.register('birthdate', {
                    ...required,
                    validate: (v) => {
                      if (isNaN(Date.parse(v)))
                        return 'Please fill in this field'
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
              error={methods.formState.errors.highestEducationAttained?.message}
              requirementLabel="optional"
            >
              <Select
                placeholder="Choose one"
                type={
                  methods.formState.errors.highestEducationAttained?.message
                    ? 'error'
                    : 'default'
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
              error={methods.formState.errors.yearsOfExperience?.message}
            >
              <Input
                type={
                  methods.formState.errors.yearsOfExperience?.message
                    ? 'error'
                    : 'default'
                }
                htmlType="number"
                min={0}
                {...methods.register('yearsOfExperience', {
                  ...required,
                  valueAsNumber: true,
                })}
              />
            </FormField>
          </Grid>

          <Experience />

          <Button
            type="secondary"
            htmlType="submit"
            style={{ marginTop: '2rem' }}
          >
            Create
          </Button>
        </Form>
      </FormProvider>
    </Page>
  )
}

const Form = styled('form', gridStyles, {
  width: 'fit-content',
})
