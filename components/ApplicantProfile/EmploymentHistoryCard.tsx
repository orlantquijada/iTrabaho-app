import { Box } from '@/components'
import { css } from '@/stitches.config'
import { Text } from '@geist-ui/react'
import { slate } from '@radix-ui/colors'

import type { Experience } from '@/utils/types'

const border = `1px solid ${slate.slate6}`

export default function ExperienceCard(props: Experience) {
  return (
    <Box
      css={{
        paddingBlock: '1.25rem',
        '&:not(:last-of-type)': { borderBottom: border },
      }}
    >
      <Text h4 className={role()}>
        {props.role}
        {props.company ? ` | ${props.company}` : null}
      </Text>
      <Text className={dates()}>
        {props.startMonth} {props.startYear} - {props.endMonth} {props.endYear}
      </Text>
      <ul
        style={{
          paddingInline: '1.25rem',
          margin: 0,
          display: 'grid',
          gap: '0.25rem',
        }}
      >
        {props.details.map((detail, index) => (
          <li
            style={{
              fontSize: '0.875rem',
              color: '#222',
              lineHeight: '20px',
              letterSpacing: 0.35,
            }}
            key={index}
          >
            {detail.description}
          </li>
        ))}
      </ul>
    </Box>
  )
}

const role = css({
  margin: 0,
  fontWeight: 500,
})

const dates = css({
  margin: '1rem 0 0.5rem',
  fontSize: '0.875rem',
  color: '#656565 !important',
})
