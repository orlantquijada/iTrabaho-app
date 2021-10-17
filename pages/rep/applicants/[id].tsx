import { Container } from '@/components'
import ApplicantProfile from '@/components/ApplicantProfile'

import EmploymentHistory from '@/components/ApplicantProfile/EmploymentHistory'
import { useApplicant } from '@/utils/hooks/useApplicant'
import { Loading } from '@geist-ui/react'
import { useRouter } from 'next/router'

export default function ApplicantDetail() {
  const { query } = useRouter()
  const applicantId = Number(query.id)

  const { isLoading, applicant } = useApplicant(applicantId)

  return (
    <Container css={{ py: '$6', display: 'grid', gap: '2rem' }}>
      {!isLoading && applicant ? (
        <>
          <ApplicantProfile applicant={applicant} />
          <EmploymentHistory experiences={applicant.profile.experiences} />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  )
}
