import { css, mapThemeToCSSProp, theme, styled } from '@/stitches.config'

export const sharedStyles = css({
  $$borderWidth: '1px',

  padding: '0 12px',
  borderStyle: 'solid',
  borderColor: '#eaeaea',
  borderWidth: '$$borderWidth',
  fontFamily: 'inherit',
  transition: 'all .15s ease',
  outline: 'none',
  width: '100%',
  borderRadius: '5px',

  '&:active, &:focus-within': { borderColor: '$black1' },
  // '&::placeholder': { color: '$gray3' },

  variants: {
    radius: mapThemeToCSSProp('borderRadius'),
    status: {
      error: {
        borderColor: '$erorr',
        caretColor: '$error',
        color: '$error',

        '&::placeholder': { color: `${theme.colors.erorr.value}66` },
        '&:active, &:focus': { borderColor: '$error' },
      },
    },
    variant: {
      outline: {},
      flushed: {
        borderBottomWidth: '$$borderWidth',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        rb: 0,
      },
      unstyled: { borderWidth: 0 },
    },
  },

  defaultVariants: {
    variant: 'outline',
  },
})

const BaseInput = styled('input', sharedStyles, {
  variants: {
    size: {
      small: { height: '32px' },
      medium: { height: '40px' },
      large: { height: '$7', fontSize: '$4' },
    },
  },

  defaultVariants: {
    size: 'medium',
  },
})

export const BaseTextArea = styled('textarea', sharedStyles, {
  py: '$2',
  resize: 'vertical',
  height: 'unset',
})

export default BaseInput
