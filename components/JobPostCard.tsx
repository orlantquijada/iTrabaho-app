import { css, styled } from '@/stitches.config'
import { JobPost } from '@/utils/types'
import { Text } from '@geist-ui/react'
import { blue, grayA, slate } from '@radix-ui/colors'
import React, { ComponentProps, forwardRef } from 'react'
import { Badge, Flex } from '.'

type Props = Pick<JobPost, 'title' | 'description' | 'role' | 'recruiter'>

export const JobPostCard = forwardRef<
  HTMLDivElement,
  Props & ComponentProps<typeof Flex>
>((props, ref) => (
  <Flex direction="column" className={cardStyles()} ref={ref}>
    <Flex justify="between" align="center">
      <Title span>{props.title}</Title>
      <Badge>{props.role}</Badge>
    </Flex>
    <Text
      className={recruiter()}
      style={{ color: grayA.grayA11, marginBlock: '0.25rem 0.5rem' }}
    >
      By {props.recruiter.fullName}
    </Text>
    <Text style={{ color: grayA.grayA11 }} className={description()}>
      {props.description}
    </Text>
  </Flex>
))

const Title = styled(Text, {
  fontSize: '1.25rem',
  fontWeight: 600,
  transition: 'color 200ms ease',
})
const cardStyles = css({
  p: '1.5rem',
  cursor: 'pointer',
  // card can be a dialog trigger (button)
  // default button styles are text-aligned center
  textAlign: 'start',

  '& p': {
    m: 0,
  },

  '&:hover': {
    backgroundColor: slate.slate2,
  },

  [`&:hover ${Title}`]: {
    color: blue.blue9,
  },
})
const recruiter = css({ fontSize: '14px' })
const description = css({ fontSize: '14px' })
