import { styled, css } from '@/stitches.config'

export const containerStyles = css({
  mx: 'auto',
  px: '$5',

  variants: {
    size: {
      xsm: { maxWidth: '430px' },
      sm: { maxWidth: '640px' },
      md: { maxWidth: '768px' },
      lg: { maxWidth: '1024px' },
      xl: { maxWidth: '1280px' },
      '2xl': { maxWidth: '1536px' },
    },
  },
  defaultVariants: {
    size: 'lg',
  },
})

const Container = styled('div', containerStyles)

export default Container
