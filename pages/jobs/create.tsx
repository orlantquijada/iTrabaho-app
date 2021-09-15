import { FormField, Grid, TextArea } from '@/components'
import SectionTitle from '@/components/ApplicantForm/SectionTitle'
import { gridStyles } from '@/components/Grid'
import { FormFields, required } from '@/components/JobPostForm/helpers'
import { styled } from '@/stitches.config'
import { Button, Input, Select } from '@geist-ui/react'
import { useController, useForm } from 'react-hook-form'

export default function CreateJobPost() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>()

  const { field: province } = useController({
    control,
    name: 'province',
    rules: required,
  })

  const { field: city } = useController({
    control,
    name: 'city',
    rules: required,
  })
  const { field: barangay } = useController({
    control,
    name: 'barangay',
    rules: required,
  })
  const { field: street } = useController({
    control,
    name: 'street',
    rules: required,
  })

  // TODO: Province, city, barangay, street options
  return (
    <Form
      noValidate
      action="POST"
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2))
      )}
      gap="2"
    >
      <section>
        <SectionTitle h1>Job Details</SectionTitle>

        <Grid gapY="4">
          <FormField title="Role" error={errors.role?.message}>
            <Input
              placeholder="Electrician"
              width="100%"
              clearable
              type={errors.role?.message ? 'error' : 'default'}
              {...register('role', required)}
            />
          </FormField>
          <FormField title="Description" error={errors.description?.message}>
            <TextArea
              rows={7}
              status={errors.description?.message ? 'error' : undefined}
              {...register('description', required)}
            />
          </FormField>
        </Grid>
      </section>
      <section>
        <SectionTitle h1>Location</SectionTitle>
        <Grid gapY="4">
          <Grid columns="2" gap="4">
            <FormField title="Province" error={errors.province?.message}>
              <Select
                placeholder="Choose one"
                type={errors.province?.message ? 'error' : 'default'}
                value={province.value}
                onChange={province.onChange}
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
            <FormField title="City" error={errors.city?.message}>
              <Select
                placeholder="Choose one"
                type={errors.city?.message ? 'error' : 'default'}
                value={city.value}
                onChange={city.onChange}
                disabled={!watch('province')}
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
          </Grid>

          <Grid columns="2" gap="4">
            <FormField title="Barangay" error={errors.barangay?.message}>
              <Select
                placeholder="Choose one"
                type={errors.barangay?.message ? 'error' : 'default'}
                value={barangay.value}
                onChange={barangay.onChange}
                disabled={!watch('city')}
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
            <FormField title="Street" error={errors.street?.message}>
              <Select
                placeholder="Choose one"
                type={errors.street?.message ? 'error' : 'default'}
                value={street.value}
                onChange={street.onChange}
                disabled={!watch('barangay')}
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
          </Grid>
        </Grid>
      </section>
      <Button type="secondary" htmlType="submit" style={{ marginTop: '2rem' }}>
        Sign Up
      </Button>
    </Form>
  )
}

const Form = styled('form', gridStyles, {
  width: 'fit-content',
})
