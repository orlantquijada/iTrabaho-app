import { Text } from '@geist-ui/react'

import { styled } from '@/stitches.config'

const SectionTitle = styled(Text, {
  fontSize: '1.25rem',
  fontWeight: '600',
  marginBlock: '1em 0.5em',

  variants: {
    hasMarginTop: {
      true: {
        marginBlockStart: '0',
      },
    },
  },
})

export default SectionTitle
