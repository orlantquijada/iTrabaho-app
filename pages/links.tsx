import NextLink from 'next/link'
import { Link } from '@geist-ui/react'

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
    </>
  )
}
