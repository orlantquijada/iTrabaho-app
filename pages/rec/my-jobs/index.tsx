import { Container, Grid, Link } from '@/components'
import { useJobPosts } from '@/utils/hooks/useJobPosts'
import useUser from '@/utils/hooks/useUser'
import { Fieldset, Loading } from '@geist-ui/react'

export default function MyJobs() {
  const user = useUser()
  const { jobs, isLoading } = useJobPosts({
    params: { recruiterId: user?.id as number },
  })

  return (
    <Container css={{ py: '$6' }}>
      <Grid
        gap="2"
        css={{
          gridTemplateColumns: isLoading
            ? undefined
            : 'repeat(auto-fill, minmax(250px,1fr))',
        }}
      >
        {!isLoading && jobs ? (
          jobs.map((job) => (
            <Link
              key={job.title}
              href={`/rec/my-jobs/${job.id}`}
              css={{ textDecoration: 'none' }}
            >
              <Fieldset>
                <Fieldset.Title style={{ color: 'black' }}>
                  {job.title}
                </Fieldset.Title>
                <Fieldset.Subtitle style={{ color: 'black' }}>
                  {job.description}
                </Fieldset.Subtitle>
                <Fieldset.Footer>{job.role}</Fieldset.Footer>
              </Fieldset>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </Grid>
    </Container>
  )
}
