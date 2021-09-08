import { useForm } from 'react-hook-form'

import { Flex, FormField } from '@/components'
import { Input, Page, Button } from '@geist-ui/react'

interface FormFields {
  fname: string
  lname: string
  phoneNumber: string
}

export default function CreateApplicantPage() {
  const { register, handleSubmit } = useForm<FormFields>()
  return (
    <Page>
      <form
        action="POST"
        onSubmit={handleSubmit((values) =>
          alert(JSON.stringify(values, null, 2))
        )}
      >
        <Flex gap="2">
          <FormField label="First Name" required>
            <Input
              placeholder="John"
              {...register('fname', { required: 'Please fill out this field' })}
            />
          </FormField>

          <FormField label="Last Name" required>
            <Input
              placeholder="Doe"
              {...register('lname', { required: 'Please fill out this field' })}
            />
          </FormField>
        </Flex>
        <Button type="secondary" htmlType="submit">
          Create
        </Button>
      </form>
    </Page>
  )
}
