import { Container, Grid, Link } from '@/components'
import ApplicantCardCompact from '@/components/ApplicantCardCompact'
import { useApplicants } from '@/utils/hooks/useApplicants'
import useUser from '@/utils/hooks/useUser'
import { Loading } from '@geist-ui/react'

export default function ApplicantsList() {
  const user = useUser()
  const { applicants, isLoading } = useApplicants({
    params: { LGURepresentative: user?.id as number },
  })

  return (
    <Container css={{ py: '$6' }}>
      {!isLoading && applicants ? (
        <Grid
          gap="2"
          css={{ gridTemplateColumns: 'repeat(auto-fill, minmax(250px,1fr))' }}
        >
          {applicants.map((recruit) => (
            <Link
              href={`/rep/applicants/${recruit.id}`}
              css={{ textDecoration: 'none' }}
              key={recruit.id}
            >
              <ApplicantCardCompact {...recruit} />
            </Link>
          ))}
        </Grid>
      ) : (
        <Loading />
      )}
    </Container>
  )
}
