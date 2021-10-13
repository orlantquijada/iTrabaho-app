import { styled } from '@stitches/react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  $$radius: '0.3125rem',
  display: 'flex',
  height: 'fit-content',
  width: 'fit-content',
  borderRadius: '$$radius',
  border: '1px solid black',
})

const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',

  cursor: 'pointer',
  fontSize: '0.75rem',
  transition: 'all 200ms ease',
  background: 'White',
  color: 'Black',
  padding: '0.5rem 1rem',

  '&:first-child': {
    borderTopLeftRadius: '$$radius',
    borderBottomLeftRadius: '$$radius',
  },
  '&:not(:last-child)': {
    borderRight: '1px solid black',
  },
  '&:last-child': {
    borderTopRightRadius: '$$radius',
    borderBottomRightRadius: '$$radius',
  },
  '&:hover, &[data-state=on]': { backgroundColor: 'Black', color: 'White' },
})

export const Root = StyledToggleGroup
export const Item = StyledItem
