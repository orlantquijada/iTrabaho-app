import { AutoComplete, Button, Card, Input, Text } from '@geist-ui/react'
import React, { ReactElement, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Grid, FormField, Flex } from '@/components'
import SectionTitle from './SectionTitle'
import { FormFields, required } from './helpers'

const allOptions = [
  { label: 'Carpenter', value: 'Carpenter' },
  { label: 'Construction Worker', value: 'Construction Worker' },
  { label: 'Plumber', value: 'Plumber' },
]

export default function Experience(): ReactElement {
  const {
    register,
    control,
    formState: { errors },
    setValue,
  } = useFormContext<FormFields>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'experience',
  })

  const [options, setOptions] =
    useState<Array<{ label: string; value: string }>>()

  const searchHandler = (currentValue: string) => {
    const createOptions = [
      {
        value: currentValue,
        label: 'Add "' + currentValue + '"',
      },
    ]
    if (!currentValue) return setOptions([])
    const relatedOptions = allOptions.filter((item) =>
      item?.value.toLowerCase().includes(currentValue)
    )
    const optionsWithCreatable =
      relatedOptions.length !== 0 ? relatedOptions : createOptions
    setOptions(optionsWithCreatable)
  }

  return (
    <section>
      <SectionTitle h1>Employment History</SectionTitle>
      <Flex direction="column" gap="2">
        {fields.map((field, index) => {
          return (
            <Card hoverable key={index}>
              <Flex justify="between">
                <Text h4 style={{ marginTop: 0 }}>
                  Experience {index + 1}
                </Text>
                {fields.length === 1 && index === 0 ? null : (
                  <Button auto scale={1 / 2} onClick={() => remove(index)}>
                    Remove
                  </Button>
                )}
              </Flex>
              <Grid gapX="4" columns="2">
                <FormField
                  title="Role"
                  error={errors.experience?.[index]?.role?.message}
                >
                  <AutoComplete
                    clearable
                    disableFreeSolo
                    placeholder="Electrician"
                    options={options}
                    onSearch={searchHandler}
                    type={
                      errors.experience?.[index]?.role?.message
                        ? 'error'
                        : 'default'
                    }
                    {...register(`experience.${index}.role` as const, required)}
                    onChange={(value) =>
                      setValue(`experience.${index}.role`, value)
                    }
                  />
                </FormField>
                <FormField title="Company" requirementLabel="optional">
                  <Input
                    placeholder="Company A"
                    clearable
                    {...register(`experience.${index}.company`)}
                  />
                </FormField>
              </Grid>
            </Card>
          )
        })}
        <Button onClick={() => append({})}>Add Employment</Button>
      </Flex>
    </section>
  )
}
