import { Box } from '@/components'
import { css } from '@/stitches.config'
import { Text } from '@geist-ui/react'
import { slate } from '@radix-ui/colors'
import EmploymentHistoryCard from './EmploymentHistoryCard'

import type { Experience } from '@/utils/types'

const border = `1px solid ${slate.slate6}`

export default function EmploymentHistory({
  experiences,
}: {
  experiences: Experience[]
}) {
  return (
    <Box css={{ border }}>
      <Box css={{ padding: '1.5rem 2rem', borderBottom: border }}>
        <Text h2 className={sectionTitlte()}>
          Employment History
        </Text>
      </Box>

      <Box css={{ paddingInline: '2rem' }}>
        {experiences.map((experience, index) => (
          <EmploymentHistoryCard {...experience} key={index} />
        ))}
      </Box>
    </Box>
  )
}

const sectionTitlte = css({
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 500,
})
