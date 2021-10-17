import { useState } from 'react'
import { Badge, Container, Flex, Grid, Link } from '@/components'
import { useJobPosts } from '@/utils/hooks/useJobPosts'
import useUser from '@/utils/hooks/useUser'
import { Fieldset, Loading, Text } from '@geist-ui/react'
import * as ToggleGroup from '@/components/ToggleGroup'
import { css } from '@/stitches.config'

type Status = 'H' | 'A' | 'D' | undefined

export default function MyJobs() {
  const user = useUser()
  const [status, setStatus] = useState<Status>()
  const { jobs, isLoading } = useJobPosts({
    params: { recruiterId: user?.id as number, status },
  })

  return (
    <Container css={{ py: '$6' }}>
      <Flex justify="between">
        <Text h1 style={{ marginTop: 0 }}>
          My Jobs
        </Text>
        <ToggleGroup.Root
          type="single"
          onValueChange={(value) => setStatus(value as Status)}
        >
          <ToggleGroup.Item value="A">Active</ToggleGroup.Item>
          <ToggleGroup.Item value="H">Hiring</ToggleGroup.Item>
          <ToggleGroup.Item value="D">Done</ToggleGroup.Item>
        </ToggleGroup.Root>
      </Flex>
      <Grid
        gap="2"
        css={{
          gridTemplateColumns: isLoading
            ? undefined
            : 'repeat(auto-fill, minmax(250px,1fr))',
        }}
      >
        {!isLoading && jobs ? <JobsList jobs={jobs} /> : <Loading />}
      </Grid>
    </Container>
  )
}

function JobsList({
  jobs,
}: {
  jobs: NonNullable<ReturnType<typeof useJobPosts>['jobs']>
}) {
  if (jobs.length === 0) {
    return <Text>No jobs currently!</Text>
  }

  return (
    <>
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/rec/my-jobs/${job.id}`}
          css={{ textDecoration: 'none' }}
        >
          <Fieldset className={flexContainer()}>
            <Fieldset.Title style={{ color: 'black' }}>
              {job.title}
            </Fieldset.Title>
            <Fieldset.Subtitle style={{ color: 'black' }}>
              {job.description}
            </Fieldset.Subtitle>
            <Fieldset.Footer
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text span>{job.role}</Text>
              <Badge color={job.status} css={{ textTransform: 'capitalize' }}>
                {job.status}
              </Badge>
            </Fieldset.Footer>
          </Fieldset>
        </Link>
      ))}
    </>
  )
}

const flexContainer = css({
  height: '100% !important',
  display: 'flex !important',
  flexDirection: 'column',

  '& .content': {
    flexGrow: 1,
    flexShrink: 0,
  },
})
