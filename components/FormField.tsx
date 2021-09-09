import type { ReactNode } from 'react'

import { css, styled } from '@/stitches.config'
import { flexStyles } from './Flex'

const errorStyles = css({
  variants: {
    error: {
      true: {
        color: '$erorr',
      },
    },
  },
})

const FieldLabel = styled('label', flexStyles)
const Span = styled('span', errorStyles, {
  color: '#444',
  pl: '1px',
  mb: '7px',
  fontSize: '14px',
  lineHeight: '1.5',
})

const Required = styled('span', { color: '$erorr' })
const Small = styled('small', errorStyles, {
  fontSize: '0.75rem',
  fontWeight: '500',
  mt: '0.5rem',
  display: 'inline-block',
  color: '#666',
})

function FormField({
  title,
  required = false,
  error,
  children,
}: {
  children: ReactNode
  title: string
  required?: boolean
  error?: string
}) {
  const hasError = Boolean(error)

  return (
    <FieldLabel direction="column">
      <Span error={hasError}>
        {title}
        {required ? <Required> *</Required> : null}
      </Span>
      {children}
      {error ? <Small error>{error}</Small> : null}
    </FieldLabel>
  )
}

export default FormField
