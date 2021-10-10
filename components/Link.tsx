import { forwardRef } from 'react'
import NextLink, { LinkProps } from 'next/link'

import type { ElementRef, ComponentProps } from 'react'
import { styled } from '@/stitches.config'

const StyledLink = styled('a', {})

const Link = forwardRef<
  ElementRef<typeof StyledLink>,
  ComponentProps<typeof StyledLink> & {
    nextLinkProps?: LinkProps
  }
>(({ href, nextLinkProps, ...rest }, ref) => {
  return (
    <NextLink
      {...nextLinkProps}
      href={nextLinkProps?.href || (href as LinkProps['href'])}
      passHref
    >
      <StyledLink ref={ref} {...rest} />
    </NextLink>
  )
})

export default Link
