import { Box } from '@/components'
import { css } from '@/stitches.config'
import { Text } from '@geist-ui/react'
import { slate } from '@radix-ui/colors'
import EmploymentHistoryCard from './EmploymentHistoryCard'

import type { Applicant } from '@/utils/types'

const border = `1px solid ${slate.slate6}`

export default function EmploymentHistory() {
  return (
    <Box css={{ border }}>
      <Box css={{ padding: '1.5rem 2rem', borderBottom: border }}>
        <Text h2 className={sectionTitlte()}>
          Employment History
        </Text>
      </Box>

      <Box css={{ paddingInline: '2rem' }}>
        {recruit.profile.experiences.map((experience, index) => (
          <EmploymentHistoryCard {...experience} key={index} />
        ))}
      </Box>
    </Box>
  )
}

const sectionTitlte = css({
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 500,
})

const recruit: Applicant = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+639222833416',
  address: '25 Bayabas Ext., Punta Princes, Cebu City, Cebu',
  fullName: 'John Doe',
  birthdate: new Date(),
  userType: 'A',
  rep: {
    id: 1,
    barangay: 'Punta Princesa',
    birthdate: new Date(),
    city: 'Cebu City',
    province: 'Cebu',
    firstName: 'Jane',
    lastName: 'Doe',
    fullName: 'Jane Doe',
    phoneNumber: '09222833416',
    userType: 'L',
  },
  profile: {
    yearsOfExperience: 4,
    highestEducationAttained: 'Primary School',
    experiences: [
      {
        endMonth: 'January',
        endYear: 2021,
        startYear: 2020,
        startMonth: 'October',
        location: 'Punta Princesa Cebu City',
        role: 'Software Engineer',
        company: 'David Dobrik LLC',
        details: [
          {
            description:
              'Write modern, performant, and robust code for a diverse array of client and internal projects',
          },
          {
            description:
              'Work with a variety of different languages, frameworks, and content management systems such as JavaScript, TypeScript, React, Vue, NativeScript, Node.js, Craft, Prismic, etc.',
          },
          {
            description:
              'Communicate and collaborate with multi-disciplinary teams of engineers, designers, producers, clients, and stakeholders on a daily basis',
          },
          {
            description:
              'Worked with a team of three designers to build a marketing website and e-commerce platform for blistabloc, an ambitious venture originating from Northeastern',
          },
        ],
      },
      {
        endMonth: 'January',
        endYear: 2021,
        startYear: 2020,
        startMonth: 'October',
        location: 'Punta Princesa Cebu City',
        role: 'Software Engineer',
        company: 'David Dobrik LLC',
        details: [
          {
            description:
              'Write modern, performant, and robust code for a diverse array of client and internal projects',
          },
          {
            description:
              'Work with a variety of different languages, frameworks, and content management systems such as JavaScript, TypeScript, React, Vue, NativeScript, Node.js, Craft, Prismic, etc.',
          },
          {
            description:
              'Communicate and collaborate with multi-disciplinary teams of engineers, designers, producers, clients, and stakeholders on a daily basis',
          },
          {
            description:
              'Worked with a team of three designers to build a marketing website and e-commerce platform for blistabloc, an ambitious venture originating from Northeastern',
          },
        ],
      },
    ],
  },
}
