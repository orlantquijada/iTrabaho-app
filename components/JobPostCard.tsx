import { css } from '@/stitches.config'
import { Card, Text } from '@geist-ui/react'
import { grayA } from '@radix-ui/colors'
import React from 'react'
import { Flex } from '.'

interface Props {
  title: string
  description: string
  role: string
  recruiter: string
}

export const JobPostCard = (props: Props) => {
  return (
    <Card hoverable className={cardStyles()}>
      <Flex justify="between" align="center">
        <Text className={title()} span>
          {props.title}
        </Text>
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
    </Card>
  )
}

const cardStyles = css({
  cursor: 'pointer',
  '& p': {
    m: 0,
  },
})
const recruiter = css({ fontSize: '14px' })
const description = css({ fontSize: '14px' })
const title = css({
  fontSize: '1.25rem',
  fontWeight: 600,
})
const role = css({
  fontSize: '0.85rem',
  fontWeight: 600,
  flexShrink: 0,

  px: '$2',
  py: '2px',
  borderRadius: '$pill',
  border: `1px solid ${grayA.grayA9}`,
  width: 'fit-content',
})
