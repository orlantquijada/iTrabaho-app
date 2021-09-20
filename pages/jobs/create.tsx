import { FormField, Grid, TextArea } from '@/components'
import { allOptions } from '@/components/ApplicantForm/helpers'
import SectionTitle from '@/components/ApplicantForm/SectionTitle'
import { gridStyles } from '@/components/Grid'
import { FormFields, required } from '@/components/JobPostForm/helpers'
import { styled } from '@/stitches.config'
import { availableLocations, cities } from '@/utils/data/location'
import { AutoComplete, Button, Input, Select, Tooltip } from '@geist-ui/react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { useController, useForm } from 'react-hook-form'

export default function CreateJobPost() {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<FormFields>()

  const { field: province } = useController({
    control,
    name: 'province',
    rules: required,
    defaultValue: 'Cebu',
  })

  const { field: city } = useController({
    control,
    name: 'city',
    rules: required,
    defaultValue: cities[0],
  })
  const { field: barangay } = useController({
    control,
    name: 'barangay',
    rules: required,
  })

  const [options, setOptions] =
    useState<Array<{ label: string; value: string }>>()
  const searchHandler = (currentValue) => {
    if (!currentValue) return setOptions([])
    const relatedOptions = allOptions.filter((item) =>
      item.value.includes(currentValue)
    )
    setOptions(relatedOptions)
  }

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
            <AutoComplete
              options={options}
              width="100%"
              placeholder="Electrician"
              onSearch={searchHandler}
              type={errors.role?.message ? 'error' : 'default'}
              {...register('role', required)}
              onChange={(value) => setValue('role', value)}
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
            <FormField
              title="Province"
              error={errors.province?.message}
              icon={
                <Tooltip text="Other Provinces will be supported soon!">
                  <InfoCircledIcon />
                </Tooltip>
              }
            >
              <Select
                placeholder="Choose one"
                type={errors.province?.message ? 'error' : 'default'}
                value={province.value}
                onChange={province.onChange}
                disabled
              >
                <Select.Option value="Cebu">Cebu</Select.Option>
              </Select>
            </FormField>
            <FormField
              title="City"
              error={errors.city?.message}
              icon={
                <Tooltip text="Other Cities will be supported soon!">
                  <InfoCircledIcon />
                </Tooltip>
              }
            >
              <Select
                placeholder="Choose one"
                type={errors.city?.message ? 'error' : 'default'}
                value={city.value}
                onChange={city.onChange}
                disabled
              >
                {cities.map((item) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
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
                disabled={!getValues('city')}
              >
                {availableLocations['Cebu City'].barangays.map((item) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </FormField>
            <FormField title="Street" error={errors.street?.message}>
              <Input
                placeholder="221B Baker Street"
                type={errors.street?.message ? 'error' : 'default'}
                clearable
                {...register('street', required)}
              />
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
