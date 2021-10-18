import { useController, useForm, FormProvider } from 'react-hook-form'

import { required, FormFields } from '@/components/ApplicantForm/helpers'
import ApplicantFormView from '@/components/ApplicantForm/ApplicantFormView'
import { Container } from '@/components'
import useUser from '@/utils/hooks/useUser'
import { createApplicant, RequestBody } from '@/utils/hooks/useApplicant'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { getSkillsList } from '@/utils/api/lib'
import { InferGetStaticPropsType } from 'next'

export default function CreateApplicantPage({
  skills,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const user = useUser()
  const methods = useForm<FormFields>({
    mode: 'onTouched',
    shouldUseNativeValidation: false,
    defaultValues: {
      experiences: [{ details: [{}] }],
    },
  })
  const [isLoading, setIsLoading] = useState(false)

  const sexController = useController({
    name: 'sex',
    control: methods.control,
    rules: required,
  })

  const educationController = useController({
    name: 'highesteducationAttained',
    control: methods.control,
    rules: required,
  })

  const handleSubmit = methods.handleSubmit(async (values) => {
    setIsLoading(true)
    const {
      experiences,
      highesteducationAttained,
      yearsOfExperience,
      ...rest
    } = values

    // parse endDate and startDate to startMonth and StartYear for each experience
    const parsedExperience = experiences.map((experience) => {
      const { startDate: start, endDate: end, ...rest } = experience
      const startDate = new Date(start)
      const endDate = new Date(end)
      const startMonth = startDate.toDateString().slice(4, 7) // Jun, Jul, Jan, etc.
      const endMonth = endDate.toDateString().slice(4, 7)
      const startYear = startDate.getFullYear().toString()
      const endYear = endDate.getFullYear().toString()

      return { ...rest, startMonth, startYear, endMonth, endYear }
    })

    const body: RequestBody = {
      ...rest,
      profile: {
        yearsOfExperience,
        highesteducationAttained,
        experiences: parsedExperience,
      },
      phoneNumber: values.phoneNumber.replaceAll(' ', ''),
      LGURepresentativeId: user?.id as number,
    }

    await createApplicant(body).then(() => setIsLoading(false))

    router.push('/rep/applicants')
  })

  const props = {
    educationController,
    sexController,
    methods,
    handleSubmit,
    isLoading,
    skills,
  }

  return (
    <Container css={{ maxWidth: 'fit-content', pt: '$6' }}>
      <FormProvider {...methods}>
        <ApplicantFormView {...props} />
      </FormProvider>
    </Container>
  )
}

export async function getStaticProps() {
  const skills = await getSkillsList()

  return {
    props: { skills },
  }
}
