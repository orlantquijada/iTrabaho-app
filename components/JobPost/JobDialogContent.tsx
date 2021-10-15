import { StarFilledIcon } from '@radix-ui/react-icons'
import * as Dialog from '@/components/Dialog'
import { Badge, Box, Flex, Grid } from '@/components'
import { JobPost } from '@/utils/types'
import { css, styled } from '@/stitches.config'
import { Text } from '@geist-ui/react'

type Props = JobPost

export default function JobDialogContent(job: Props) {
  return (
    <Dialog.Content css={{ minWidth: '800px' }}>
      <Flex
        as="section"
        justify="between"
        align="center"
        css={{ mb: '1.25rem' }}
      >
        <Flex gap="2">
          <Dialog.Title
            css={{
              fontSize: '1.25rem',
              fontWeight: 600,
              transition: 'color 200ms ease',
            }}
          >
            {job.title}
          </Dialog.Title>
        </Flex>
        <Badge>{job.role}</Badge>
      </Flex>

      <Grid as="section" css={{ gridTemplateColumns: '1fr 30%' }} gap="4">
        <Flex direction="column">
          <SectionTitle>Description</SectionTitle>
          <Text margin="0">{job.description}</Text>
        </Flex>

        <Flex direction="column" gap="1">
          <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
            <SectionTitle>Recruiter</SectionTitle>
            <Text margin="0">{job.recruiter.fullName}</Text>
          </Grid>

          {job.status !== 'hiring' ? (
            <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
              <SectionTitle>Recruit</SectionTitle>
              <Text margin="0">{job.recruit.fullName}</Text>
            </Grid>
          ) : null}

          <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
            <SectionTitle>Location</SectionTitle>
            <Text margin="0">
              {job.street} {job.barangay} {job.city} {job.province}
            </Text>
          </Grid>

          <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
            <SectionTitle>Status</SectionTitle>
            <Badge color={job.status} css={{ textTransform: 'capitalize' }}>
              {job.status}
            </Badge>
          </Grid>

          <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
            <SectionTitle>Posted On</SectionTitle>
            <Text margin="0">{job.datetimeCreated.toDateString()}</Text>
          </Grid>
        </Flex>
      </Grid>

      {job.status !== 'hiring' &&
      (job?.applicantReview || job?.recruiterReview) ? (
        <Box as="section">
          <Feedback>Job Feedback</Feedback>
          <Grid columns="2" gap="4">
            {job.applicantReview ? (
              <Box>
                <Grid align="center" justify="start" flow="column">
                  <Text span margin="0" marginRight={0.5}>
                    Recruit&apos;s feedback to the recruiter
                  </Text>
                  <StarFilledIcon />
                  <Text span className={rateValue()}>
                    {job.applicantReview.rate}
                  </Text>
                </Grid>
                <Text className={feedBackComment()}>
                  &quot;{job.applicantReview.comment}&quot;
                </Text>
              </Box>
            ) : null}

            {job.recruiterReview ? (
              <Box>
                <Grid align="center" justify="start" flow="column">
                  <Text span margin="0" marginRight={0.5}>
                    Recruiter&apos;s feedback
                  </Text>
                  <StarFilledIcon />
                  <Text span className={rateValue()}>
                    {job.recruiterReview.rate}
                  </Text>
                </Grid>
                <Text className={feedBackComment()}>
                  &quot;{job.recruiterReview.comment}&quot;
                </Text>
              </Box>
            ) : null}
          </Grid>
        </Box>
      ) : null}
    </Dialog.Content>
  )
}

const rateValue = css({
  fontSize: '0.75rem',
  color: '#111 !important',
  marginInlineStart: '5px',
})

const feedBackComment = css({
  fontSize: '0.875rem',
  marginBlock: '10px 0',
  fontStyle: 'italic',
})
const Feedback = styled('h4', {
  fontSize: '1.125rem',
  fontWeight: 500,
  marginBlock: '0 1rem',
})

const SectionTitle = styled('span', {
  fontSize: '0.875rem',
  fontWeight: 600,
  letterSpacing: '-0.003em',
  lineHeight: '24px',
})
