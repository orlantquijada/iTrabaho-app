import { Container } from '@/components'
import ApplicantProfile from '@/components/ApplicantProfile'

import EmploymentHistory from '@/components/ApplicantProfile/EmploymentHistory'

export default function ApplicantDetail() {
  return (
    <Container css={{ py: '$6', display: 'grid', gap: '2rem' }}>
      <ApplicantProfile />
      <EmploymentHistory />
    </Container>
  )
}
