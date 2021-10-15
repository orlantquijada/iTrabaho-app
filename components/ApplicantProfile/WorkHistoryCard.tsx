import * as Dialog from '@/components/Dialog'
import { ActiveJobPost, DoneJobPost } from '@/utils/types'
import { Box, Grid } from '@/components'
import JobDialogContent from '../JobPost/JobDialogContent'
import { Text } from '@geist-ui/react'
import { css, styled } from '@/stitches.config'
import { blue } from '@radix-ui/colors'
import { StarFilledIcon } from '@radix-ui/react-icons'
import { toDefaultDateFormat } from '@/utils/functions'

const JobTitle = styled(Text, {
  margin: 0,
  marginBlockEnd: '$2',
  fontWeight: 500,
  transition: 'all 200ms ease',
})

export default function WorkHistoryCard(job: ActiveJobPost | DoneJobPost) {
  return (
    <Dialog.Root>
      <Dialog.CleanedUpTrigger asChild>
        <Box
          css={{
            paddingBlock: '1.25rem',
            cursor: 'pointer',

            [`&:hover ${JobTitle}`]: {
              color: blue.blue9,
            },
          }}
        >
          <JobTitle>{job.title}</JobTitle>

          <Grid inline align="center" justify="start" flow="column">
            {job.applicantReview ? (
              <>
                <StarFilledIcon />
                <Text span className={rate()}>
                  {job.applicantReview.rate}
                </Text>
              </>
            ) : null}
            <Text small className={dates()}>
              {toDefaultDateFormat(job.datetimeCreated)} -{' '}
              {job.status === 'done'
                ? toDefaultDateFormat(job.datetimeEnded)
                : 'Present'}
            </Text>
          </Grid>
          {job.applicantReview ? (
            <Comment>&quot;{job.applicantReview.comment}&quot;</Comment>
          ) : (
            <Text className={noFeedback()}>
              {job.status === 'done' ? 'No feedback given' : 'Job in progress'}
            </Text>
          )}
        </Box>
      </Dialog.CleanedUpTrigger>
      <JobDialogContent {...job} />
    </Dialog.Root>
  )
}

const Comment = styled('blockquote', {
  fontSize: '0.875rem',
  color: '#222 !important',
  marginBlock: '10px 0',
  marginInlineStart: 0,
  fontStyle: 'italic',
})

const rate = css({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: '#222 !important',
  marginInlineEnd: '$2',
})

const dates = css({
  fontSize: '0.75rem',
  color: '#656565 !important',
})

const noFeedback = css({
  fontSize: '0.875rem',
  color: '#656565 !important',
})
