import { useState } from 'react'
import { allOptions } from '@/components/ApplicantForm/helpers'
import { FormFields, required } from '@/components/JobPost/helpers'
import { cities } from '@/utils/data/location'
import { useController, useForm } from 'react-hook-form'
import JobPostFormView from '@/components/JobPost/JobPostFormView'
import { Container } from '@/components'

export default function CreateJobPost() {
  const methods = useForm<FormFields>()

  const provinceController = useController({
    control: methods.control,
    name: 'province',
    rules: required,
    defaultValue: 'Cebu',
  })

  const cityController = useController({
    control: methods.control,
    name: 'city',
    rules: required,
    defaultValue: cities[0],
  })
  const barangayController = useController({
    control: methods.control,
    name: 'barangay',
    rules: required,
  })

  const [options, setOptions] = useState<
    Array<{ label: string; value: string }>
  >([])

  const searchHandler = (currentValue: string) => {
    if (!currentValue) return setOptions([])
    const relatedOptions = allOptions.filter((item) =>
      item.value.includes(currentValue)
    )
    setOptions(relatedOptions)
  }
  const props = {
    methods,
    provinceController,
    cityController,
    barangayController,
    options,
    searchHandler,
  }

  return (
    <Container css={{ maxWidth: 'fit-content', pt: '$6' }}>
      <JobPostFormView {...props} />
    </Container>
  )
}
