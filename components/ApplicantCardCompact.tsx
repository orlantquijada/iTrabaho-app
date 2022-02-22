import Image from 'next/image'

import { Applicant } from '@/utils/types'
import { Card, Text } from '@geist-ui/react'
import { Box, Grid } from '@/components'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { css } from '@/stitches.config'
import { slate } from '@radix-ui/colors'
import { useApplicantMetrics } from '@/utils/hooks/useApplicant'

export default function ApplicantCardCompact({
  fullName,
  phoneNumber,
  id,
}: Applicant) {
  const { isLoading, metrics } = useApplicantMetrics(id)
  return (
    <Card hoverable>
      <Card.Content className={userCard()}>
        <Image
          alt="Profile Picture"
          src={`https://avatars.dicebear.com/api/initials/${fullName}.svg?r=50&size=28`}
          width={28}
          height={28}
        />
        <Box css={{ textAlign: 'start' }}>
          <Text span className={title()}>
            {fullName}
          </Text>
          <Text className={subtitle()}>{phoneNumber}</Text>

          <Grid
            flow="column"
            css={{
              width: 'fit-content',
              placeItems: 'center',
              marginTop: '0.5rem',
            }}
          >
            <StarFilledIcon />
            <Text span className={rateValue()}>
              {!isLoading ? metrics?.rating : null}
            </Text>
            <Text span className={rateCount()}>
              {!isLoading ? `(${metrics?.jobs})` : null}
            </Text>
          </Grid>
        </Box>
      </Card.Content>
    </Card>
  )
}

const rateValue = css({
  fontSize: '0.75rem',
  color: '#111 !important',
  marginInlineStart: '5px',
})
const rateCount = css({
  fontSize: '0.75rem',
  color: `${slate.slate11} !important`,
})
const title = css({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#111 !important',
  textTransform: 'capitalize',
})
const subtitle = css({
  margin: 0,
  fontSize: '0.75rem',
  color: '#444 !important',
})
const userCard = css({
  display: 'grid',
  gridTemplateColumns: '28px 1fr',
  alignItems: 'flex-start',
  gap: '$2',
})
