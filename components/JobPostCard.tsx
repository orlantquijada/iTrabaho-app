import { css, styled } from '@/stitches.config'
import { Text } from '@geist-ui/react'
import { blue, grayA, slate } from '@radix-ui/colors'
import React, { ComponentProps, forwardRef } from 'react'
import { Flex } from '.'

interface Props {
  title: string
  description: string
  role: string
  recruiter: string
}

export const JobPostCard = forwardRef<
  HTMLDivElement,
  Props & ComponentProps<typeof Flex>
>((props, ref) => (
  <Flex direction="column" className={cardStyles()} ref={ref}>
    <Flex justify="between" align="center">
      <Title span>{props.title}</Title>
      <Text className={role()} span>
        {props.role}
      </Text>
    </Flex>
    <Text
      className={recruiter()}
      style={{ color: grayA.grayA11, marginBlock: '0.25rem 0.5rem' }}
    >
      By {props.recruiter}
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
const role = css({
  fontSize: '0.75rem',
  fontWeight: 600,
  flexShrink: 0,
  color: `${slate.slate11} !important`,

  px: '$2',
  py: '$1',
  borderRadius: '$pill',
  background: slate.slate5,
  width: 'fit-content',
})
