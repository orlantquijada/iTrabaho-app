import { useState } from 'react'
import { allOptions } from '@/components/ApplicantForm/helpers'
import { FormFields, required } from '@/components/JobPost/helpers'
import { cities } from '@/utils/data/location'
import { FormProvider, useController, useForm } from 'react-hook-form'
import JobPostFormView from '@/components/JobPost/JobPostFormView'
import { Container } from '@/components'
import { addJobPost, useJobPosts } from '@/utils/hooks/useJobPosts'
import useUser from '@/utils/hooks/useUser'
import { useRouter } from 'next/router'
import { InferGetServerSidePropsType } from 'next'
import { getSkillsList } from '@/utils/api/lib'
import axios from '@/utils/api/axios'

export default function CreateJobPost({
  skills,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const user = useUser()
  const router = useRouter()
  const methods = useForm<FormFields>()
  const { isValidating, mutate } = useJobPosts({
    params: { recruiterId: user?.id as number },
  })

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

  const handleSubmit = methods.handleSubmit(async (values) => {
    // const selectedSkills = values.skills as unknown as Array<{ name: string }>
    // const selectedSkillsIds = selectedSkills.map(
    //   (skill) => skills.find(({ name }) => name === skill.name)?.id as number
    // )

    const job = await addJobPost({
      ...values,
      recruiterId: user?.id as number,
      skills: [],
    })

    await axios.post('api/match/', { id: job.data.id })

    mutate(async (jobs) => (jobs ? [...jobs, job.data] : [job.data]))

    router.push(`/rec/my-jobs/${job.data.id}`)
  })

  return (
    <Container css={{ maxWidth: 'fit-content', py: '$6' }}>
      <FormProvider {...methods}>
        <JobPostFormView
          {...props}
          handleSubmit={handleSubmit}
          isCreatingJobPost={isValidating}
          skills={skills}
        />
      </FormProvider>
    </Container>
  )
}

export async function getServerSideProps() {
  const skills = await getSkillsList()

  return {
    props: { skills },
  }
}
