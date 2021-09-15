import NextLink from 'next/link'
import { Link } from '@geist-ui/react'

export default function Home() {
  return (
    <>
      <NextLink href="rep/applicant/create" passHref>
        <Link color block>
          create applicant form
        </Link>
      </NextLink>
      <NextLink href="recruiter/signup" passHref>
        <Link color block>
          create recruiter account
        </Link>
      </NextLink>
    </>
  )
}
