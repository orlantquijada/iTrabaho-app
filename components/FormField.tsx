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

export const FieldLabel = styled('label', flexStyles)
export const Span = styled('span', errorStyles, {
  color: '#444',
  pl: '1px',
  mb: '7px',
  fontSize: '14px',
  lineHeight: '1.5',
  mr: '$1',
  display: 'flex',
  alignItems: 'center',

  '& .tooltip': {
    display: 'inline-flex !important',
    ml: '4px',
  },
})

const requirementLabelSharedStyles = css({
  ml: '4px',
})
const Optional = styled('span', requirementLabelSharedStyles, {
  color: '#666',
  fontSize: '0.75rem',
  fontStyle: 'italic',
})
const Required = styled('span', requirementLabelSharedStyles, {
  color: '$erorr',
})
export const Small = styled('small', errorStyles, {
  fontSize: '0.75rem',
  fontWeight: '500',
  mt: '0.5rem',
  display: 'inline-block',
  color: '#666',
})

function FormField({
  title,
  requirementLabel,
  error,
  children,
  icon,
}: {
  children: ReactNode
  title: string
  requirementLabel?: 'required' | 'optional'
  error?: string
  icon?: ReactNode
}) {
  const hasError = Boolean(error)

  let label = null

  if (requirementLabel === 'required') label = <Required>*</Required>
  else if (requirementLabel === 'optional')
    label = <Optional>(Optional)</Optional>

  return (
    <FieldLabel direction="column">
      <Span error={hasError}>
        {title}

        {icon}
        {label}
      </Span>
      {children}
      {error ? <Small error>{error}</Small> : null}
    </FieldLabel>
  )
}

export default FormField
