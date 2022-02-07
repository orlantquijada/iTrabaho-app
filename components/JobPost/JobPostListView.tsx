import { Component } from 'react'
import * as Dialog from '@/components/Dialog'
import { JobPostCard } from '@/components/JobPostCard'
import { styled } from '@/stitches.config'
import { slate } from '@radix-ui/colors'
import JobDialogContent from './JobDialogContent'
import { JobPost } from '@/utils/types'
import { Box, Link } from '..'
import { Router, withRouter } from 'next/router'
import { Text } from '@geist-ui/react'

interface Props {
  jobId?: number
  jobs: JobPost[]
  router: Router
}

class JobPostListView extends Component<Props> {
  onOpenChange = (open: boolean) => {
    if (!open) this.props.router.push('/jobs')
  }

  displayJobPostList = () => {
    return this.props.jobs.map((job, index) => (
      <Dialog.Root
        key={index}
        open={job.id === this.props.jobId}
        onOpenChange={this.onOpenChange}
      >
        <Dialog.CleanedUpTrigger asChild>
          <Link
            nextLinkProps={{
              scroll: false,
              shallow: true,
              href: {
                query: {
                  job: job.id,
                },
              },
            }}
            css={{ textDecoration: 'none' }}
          >
            <JobPostCard
              title={job.title}
              description={job.description}
              recruiter={job.recruiter}
              role={job.role}
            />
          </Link>
        </Dialog.CleanedUpTrigger>
        <JobDialogContent {...job} />
      </Dialog.Root>
    ))
  }

  render() {
    if (!this.props.jobs.length)
      return (
        <Box>
          <Text style={{ fontWeight: 700 }}>Sorry!</Text>
          <Text>No Available jobs at the moment.</Text>
        </Box>
      )

    return <JobsListContainer>{this.displayJobPostList()}</JobsListContainer>
  }
}

const JobsListContainer = styled('div', {
  $$border: `1px solid ${slate.slate6}`,
  borderInline: '$$border',
  borderTop: '$$border',

  '& > a > div': {
    borderBottom: '$$border',
  },
})

export default withRouter(JobPostListView)
