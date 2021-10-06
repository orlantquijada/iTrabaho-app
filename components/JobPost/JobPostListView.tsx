import { Component } from 'react'
import { Flex, Badge, Grid } from '@/components'
import * as Dialog from '@/components/Dialog'
import { JobPostCard } from '@/components/JobPostCard'
import { styled } from '@/stitches.config'
import { Text } from '@geist-ui/react'
import { slate } from '@radix-ui/colors'
import { JobPost, JobPostAPIResponse } from '@/utils/types'
import axios from '@/utils/api/axios'
import { parseJobPostsAPIResponse } from '@/utils/helpers'

type State = {
  jobs: JobPost[] | undefined
}
export default class JobPostListView extends Component<any, State> {
  state: State = {
    jobs: undefined,
  }
  async getJobPostData(): Promise<JobPost[]> {
    const response = await axios.get<JobPostAPIResponse[]>('jobs/list/')
    const data = response.data
    return data.map((jobPost) => parseJobPostsAPIResponse(jobPost))
  }

  displayJobPostList = (jobs?: JobPost[]) => {
    return (
      jobs &&
      jobs.map((job, index) => (
        <Dialog.Root key={index}>
          <Dialog.CleanedUpTrigger>
            <JobPostCard
              title={job.title}
              description={job.description}
              recruiter={job.recruiter.fullName}
              role={job.role}
            />
          </Dialog.CleanedUpTrigger>
          <Dialog.Content css={{ minWidth: '800px' }}>
            <Flex justify="between" align="center" css={{ mb: '1.25rem' }}>
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

            <Grid css={{ gridTemplateColumns: '1fr 30%' }} gap="4">
              <Flex direction="column">
                <SectionTitle>Description</SectionTitle>
                <Text p margin="0">
                  {job.description}
                </Text>
              </Flex>

              <Flex direction="column" gap="1">
                <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                  <SectionTitle>Recruiter</SectionTitle>
                  <Text margin="0">{job.recruiter}</Text>
                </Grid>

                {job.status !== 'hiring' ? (
                  <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                    <SectionTitle>Recruit</SectionTitle>
                    <Text margin="0">{job.recruit}</Text>
                  </Grid>
                ) : null}

                <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                  <SectionTitle>Location</SectionTitle>
                  <Text margin="0">{`${job.city},${job.province}`}</Text>
                </Grid>

                <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                  <SectionTitle>Status</SectionTitle>
                  <Badge
                    variant={job.status}
                    css={{ textTransform: 'capitalize' }}
                  >
                    {job.status}
                  </Badge>
                </Grid>

                <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                  <SectionTitle>Posted On</SectionTitle>
                  <Text margin="0">{job.datetimeCreated.toDateString()}</Text>
                </Grid>
              </Flex>
            </Grid>
          </Dialog.Content>
        </Dialog.Root>
      ))
    )
  }

  render() {
    this.getJobPostData().then((jobs) => this.setState({ jobs }))

    return (
      <JobsListContainer>
        {this.displayJobPostList(this.state.jobs)}
      </JobsListContainer>
    )
  }
}

const SectionTitle = styled('span', {
  fontSize: '0.875rem',
  fontWeight: 600,
  letterSpacing: '-0.003em',
  lineHeight: '24px',
})

const JobsListContainer = styled('div', {
  $$border: `1px solid ${slate.slate6}`,
  borderInline: '$$border',
  borderTop: '$$border',

  '& > button': {
    borderBottom: '$$border',
  },
})
