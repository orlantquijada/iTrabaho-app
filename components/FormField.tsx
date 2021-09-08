import type { ReactNode } from 'react'

import { styled } from '@/stitches.config'
import { flexStyles } from './Flex'

const FieldLabel = styled('label', flexStyles)
const Span = styled('span', {
  color: '#444',
  pl: '1px',
  mb: '7px',
  fontSize: '14px',
  lineHeight: '1.5',
})

const Required = styled('span', { color: '$erorr' })

function FormField({
  children,
  label,
  required = false,
}: {
  children: ReactNode
  label: string
  required?: boolean
}) {
  return (
    <FieldLabel direction="column">
      <Span>
        {label}
        {required ? <Required> *</Required> : null}
      </Span>
      {children}
    </FieldLabel>
  )
}

export default FormField
