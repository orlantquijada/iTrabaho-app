import { css, styled } from '@/stitches.config'
import { blue, grass, slate, tomato } from '@radix-ui/colors'

const badgeStyles = css({
  fontSize: '0.75rem',
  fontWeight: 600,
  flexShrink: 0,
  cursor: 'default',

  px: '$2',
  py: '$1',
  borderRadius: '$pill',
  width: 'fit-content',

  variants: {
    variant: {
      hiring: {
        color: tomato.tomato11,
        background: tomato.tomato5,
      },
      done: {
        color: grass.grass11,
        background: grass.grass5,
      },
      active: {
        color: blue.blue11,
        background: blue.blue5,
      },
    },
    color: {
      gray: {
        color: slate.slate11,
        background: slate.slate5,
      },
    },
  },

  defaultVariants: {
    color: 'gray',
  },
})

export default styled('span', badgeStyles)
