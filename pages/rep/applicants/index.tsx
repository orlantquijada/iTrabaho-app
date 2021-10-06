import Image from 'next/image'

import { Box, Container, Grid } from '@/components'
import { css } from '@/stitches.config'
import { Card, Text } from '@geist-ui/react'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { slate } from '@radix-ui/colors'

export default function ApplicantsList() {
  return (
    <Container css={{ py: '$6' }}>
      <Grid
        gap="2"
        css={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))' }}
      >
        {/* users list */}
        <Card hoverable>
          <Card.Content className={userCard()}>
            <Image
              alt="Profile Picture"
              src={`https://avatars.dicebear.com/api/initials/${
                'John' + ' ' + 'Doe'
              }.svg?r=50&size=28`}
              width={28}
              height={28}
            />
            <Box>
              <Text span className={title()}>
                John Doe
              </Text>
              {/* not sure pero basig ang source ani kay ang last job niya or most frequent occuring role sa experiences? */}
              <Text className={subtitle()}>Software Engineer</Text>

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
                  4.8
                </Text>
                <Text span className={rateCount()}>
                  (45)
                </Text>
              </Grid>
            </Box>
          </Card.Content>
        </Card>
      </Grid>
    </Container>
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
