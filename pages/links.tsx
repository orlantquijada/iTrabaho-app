import NextLink from 'next/link'
import { Link } from '@geist-ui/react'
import { JobPostCard } from '@/components/JobPostCard'
import { Container } from '@/components'

export default function Home() {
  return (
    <>
      <NextLink href="rep/applicants/create" passHref>
        <Link color block>
          create applicant form
        </Link>
      </NextLink>
      <NextLink href="jobs/create" passHref>
        <Link color block>
          create job post
        </Link>
      </NextLink>
      <NextLink href="jobs" passHref>
        <Link color block>
          jobs list
        </Link>
      </NextLink>
      <Container size="md">
        <JobPostCard
          title="Create a social media strategy for my business"
          description="Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts."
          recruiter="John Doe"
          role="Communications Expert"
        />
      </Container>
    </>
  )
}
