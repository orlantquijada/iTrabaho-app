import { styled } from '@/stitches.config'
import { Rating } from '@geist-ui/react'
import { FormField, TextArea } from '@/components'
import { UseFormReturn } from 'react-hook-form'

interface Props {
  methods: UseFormReturn<FormFields>
  handleSubmit: ReturnType<UseFormReturn['handleSubmit']>
}

export default function ReviewForm(props: Props) {
  return (
    <Form noValidate action="POST">
      <Rating
        onValueChange={(value) => props.methods.setValue('rating', value)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBlockEnd: '1rem',
        }}
      />

      <FormField title="Comment" requirementLabel="optional">
        <TextArea rows={4} {...props.methods.register('comment')} />
      </FormField>
    </Form>
  )
}

const Form = styled('form', {})

export interface FormFields {
  rating: number
  comment?: string
}
