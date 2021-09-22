import { Component } from 'react'
import { styled } from '@/stitches.config'
import { gridStyles } from '@/components/Grid'
import { UseControllerReturn, UseFormReturn } from 'react-hook-form'
import { FormFields, required } from './helpers'
import { AutoComplete, Button, Input, Select, Tooltip } from '@geist-ui/react'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { availableLocations, cities } from '@/utils/data/location'
import { FormField, Grid, TextArea } from '@/components'
import SectionTitle from '@/components/ApplicantForm/SectionTitle'

type State = FormFields

interface Props {
  methods: UseFormReturn<FormFields>
  provinceController: UseControllerReturn<FormFields, 'province'>
  cityController: UseControllerReturn<FormFields, 'city'>
  barangayController: UseControllerReturn<FormFields, 'barangay'>
  options: Array<{ label: string; value: string }>
  searchHandler: (currentValue: any) => void
}

export default class JobPostFormView extends Component<Props, State> {
  // TODO: connect to backend
  postJob = (values: FormFields) => {
    alert(JSON.stringify(values, null, 2))
  }
  render() {
    const {
      methods,
      provinceController,
      cityController,
      barangayController,
      searchHandler,
      options,
    } = this.props
    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
      getValues,
    } = methods

    return (
      <Form
        noValidate
        action="POST"
        onSubmit={handleSubmit(this.postJob)}
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
                type={
                  this.props.methods.formState.errors.role?.message
                    ? 'error'
                    : 'default'
                }
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
                  value={provinceController.field.value}
                  onChange={provinceController.field.onChange}
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
                  value={cityController.field.value}
                  onChange={cityController.field.onChange}
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
                  value={barangayController.field.value}
                  onChange={barangayController.field.onChange}
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
