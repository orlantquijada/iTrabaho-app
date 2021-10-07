import { styled } from '@/stitches.config'
import { blue, slate } from '@radix-ui/colors'
import * as TabsPrimitive from '@radix-ui/react-tabs'

export const Root = styled(TabsPrimitive.Root, {})
export const Trigger = styled(TabsPrimitive.Trigger, {
  $$accent: blue.blue9,
  background: 'none',
  minHeight: '2.5rem',
  padding: '$2 $1 $1',
  cursor: 'pointer',
  transition: 'all 150ms ease',
  fontWeight: 500,
  fontSize: '0.875rem',

  '&[data-state="active"]': {
    color: '$$accent',
    boxShadow: 'inset 0 -2px 0 $$accent',
  },

  '&:not(&[data-state="active"]):hover': {
    color: '$$accent',
  },
})
export const List = styled(TabsPrimitive.List, {
  display: 'flex',
  gap: '1.25rem',
  borderBottom: `1px solid ${slate.slate6}`,
  paddingInline: '2rem',
})
export const Content = styled(TabsPrimitive.Content, {
  paddingInline: '2rem',
})
