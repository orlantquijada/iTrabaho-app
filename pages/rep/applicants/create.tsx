import { useController, useForm, FormProvider } from 'react-hook-form'

import { required, FormFields } from '@/components/ApplicantForm/helpers'
import ApplicantFormView from '@/components/ApplicantForm/ApplicantFormView'

export default function CreateApplicantPage() {
  const methods = useForm<FormFields>({
    mode: 'onTouched',
    shouldUseNativeValidation: false,
    defaultValues: {
      experience: [{ details: [{}] }],
    },
  })

  const sexController = useController({
    name: 'sex',
    control: methods.control,
    rules: required,
  })

  const educationController = useController({
    name: 'highestEducationAttained',
    control: methods.control,
    rules: required,
  })

  const props = {
    educationController,
    sexController,
    methods,
  }

  return (
    <FormProvider {...methods}>
      <ApplicantFormView {...props} />
    </FormProvider>
  )
}
