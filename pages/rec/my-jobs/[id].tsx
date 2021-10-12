import { Badge, Box, Container, Flex, Grid } from '@/components'
import ApplicantCardCompact from '@/components/ApplicantCardCompact'
import { css } from '@/stitches.config'
import { useJobPost } from '@/utils/hooks/useJobPost'
import { Applicant } from '@/utils/types'
import { Loading, Text, Description } from '@geist-ui/react'
import { slate } from '@radix-ui/colors'
import { useRouter } from 'next/router'

import * as Dialog from '@/components/Dialog'
import ApplicantDetail from '@/pages/rep/applicants/[id]'

const border = `1px solid ${slate.slate6}`

export default function JobDetail() {
  const router = useRouter()
  const { id } = router.query
  const { job, isLoading } = useJobPost(Number(id))

  return (
    <Container css={{ py: '$6', display: 'grid', gap: '2rem' }}>
      {!isLoading && job ? (
        <Grid
          css={{
            border,
            gridTemplateColumns: '30% 1fr',
            gridTemplateAreas: '"header header" "side main"',
          }}
        >
          <Flex
            justify="between"
            align="center"
            css={{
              borderBottom: border,
              padding: '2rem',
              gridArea: 'header',
            }}
          >
            <Text h1 className={jobTitle()}>
              {job.title}
            </Text>
            <Badge>{job.role}</Badge>
          </Flex>

          <Box as="aside" css={{ gridArea: 'side', borderRight: border }}>
            <Flex
              as="section"
              direction="column"
              gap="5"
              css={{ padding: '1.25rem 2rem' }}
            >
              <Description title="Recruiter" content={job.recruiter.fullName} />
              {job.status !== 'hiring' ? (
                <Description title="Recruit" content={job.recruit.fullName} />
              ) : null}
              <Description
                title="Location"
                content={`${job.street} ${job.barangay} ${job.city} ${job.province}`}
              />
              <Description
                title="Status"
                content={
                  <Badge
                    variant={job.status}
                    css={{ textTransform: 'capitalize' }}
                  >
                    {job.status}
                  </Badge>
                }
              />
              <Description
                title="Post On"
                content={job.datetimeCreated.toDateString()}
              />
            </Flex>
          </Box>

          <Box css={{ gridArea: 'main' }}>
            <Flex
              as="section"
              gap="6"
              direction="column"
              css={{ padding: '2rem' }}
            >
              <Description
                title="Description"
                content={<p className={description()}>{job.description}</p>}
              />
              <Description
                title="Applicants"
                content={
                  <Grid
                    gap="2"
                    css={{
                      gridTemplateColumns:
                        'repeat(auto-fill, minmax(200px,1fr))',
                    }}
                  >
                    {recruistList.map((recruit, index) => (
                      <Dialog.Root key={index}>
                        <Dialog.CleanedUpTrigger css={{ paddingInline: 0 }}>
                          <ApplicantCardCompact {...recruit} />
                        </Dialog.CleanedUpTrigger>
                        <Dialog.Content
                          css={{
                            minWidth: '75vw',
                            padding: 0,
                            overflow: 'auto',
                          }}
                        >
                          <ApplicantDetail css={{ m: 'auto', p: '$8 $6' }} />
                        </Dialog.Content>
                      </Dialog.Root>
                    ))}
                  </Grid>
                }
              />
            </Flex>
          </Box>
        </Grid>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

const jobTitle = css({
  fontSize: '1.625rem',
  fontWeight: 500,
  margin: 0,
})

const description = css({
  // fontSize: '0.875rem',
  fontSize: '1rem',
  fontWeight: 400,
  margin: 0,
  letterSpacing: '-0.003em',
  lineHeight: '24px',
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
    experience: [
      {
        end_month: 'January',
        end_year: 2021,
        start_year: 2020,
        start_month: 'October',
        location: 'Punta Princesa Cebu City',
        role: 'Software Engineer',
        company: 'David Dobrik LLC',
        experienceDetails: [
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
        end_month: 'January',
        end_year: 2021,
        start_year: 2020,
        start_month: 'October',
        location: 'Punta Princesa Cebu City',
        role: 'Software Engineer',
        company: 'David Dobrik LLC',
        experienceDetails: [
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

const recruistList = [
  recruit,
  recruit,
  recruit,
  recruit,
  recruit,
  recruit,
  recruit,
  recruit,
]
