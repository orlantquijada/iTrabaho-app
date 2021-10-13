import { Badge, Box, Container, Flex, Grid } from '@/components'
import ApplicantCardCompact from '@/components/ApplicantCardCompact'
import { css } from '@/stitches.config'
import { useJobPost } from '@/utils/hooks/useJobPost'
import { Applicant } from '@/utils/types'
import {
  Loading,
  Text,
  Description,
  Button,
  Modal,
  useModal,
} from '@geist-ui/react'
import { slate } from '@radix-ui/colors'
import { useRouter } from 'next/router'
import ApplicantProfile from '@/components/ApplicantProfile'

import * as Dialog from '@/components/Dialog'
import EmploymentHistory from '@/components/ApplicantProfile/EmploymentHistory'
import { useState } from 'react'
import ReviewForm, { FormFields } from '@/components/ReviewForm'
import { useForm } from 'react-hook-form'

const border = `1px solid ${slate.slate6}`

export default function JobDetail() {
  const router = useRouter()
  const { id } = router.query
  const jobId = Number(id)
  const { job, isLoading, mutate, isValidating } = useJobPost(jobId)
  const { bindings, setVisible } = useModal()
  const methods = useForm<FormFields>({
    mode: 'onTouched',
    defaultValues: { rating: 0 },
  })

  // TODO: connect to api
  const handleSubmit = methods.handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2))
    setVisible(false)
  })

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
              css={{ padding: '2rem' }}
            >
              <Description title="Recruiter" content={job.recruiter.fullName} />
              {job.status !== 'hiring' ? (
                <Description title="Recruit" content={job.recruit.fullName} />
              ) : null}
              <Description
                title="Location"
                content={`${job.street} ${job.barangay}, ${job.city}, ${job.province}`}
              />
              <Description
                title="Status"
                content={
                  <Badge
                    color={job.status}
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
              {job.status === 'active' ? (
                <>
                  <Button type="secondary" onClick={() => setVisible(true)}>
                    Finish Job
                  </Button>
                  <Modal {...bindings}>
                    <Modal.Title>Feedback</Modal.Title>
                    <Modal.Subtitle style={{ textTransform: 'initial' }}>
                      How would you rate{' '}
                      <span style={{ fontWeight: 700 }}>
                        {job.recruit.fullName}
                      </span>
                      ?
                    </Modal.Subtitle>
                    <Modal.Content>
                      <ReviewForm
                        handleSubmit={handleSubmit}
                        methods={methods}
                      />
                    </Modal.Content>
                    <Modal.Action passive onClick={() => setVisible(false)}>
                      Cancel
                    </Modal.Action>
                    <Modal.Action onClick={handleSubmit}>Submit</Modal.Action>
                  </Modal>
                </>
              ) : null}
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

              {job.status === 'hiring' ? (
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
                        <ApplicantDialog
                          recruit={recruit}
                          isValidating={isValidating}
                          onClick={() => {
                            mutate((data) => data)
                          }}
                          key={index}
                        />
                      ))}
                    </Grid>
                  }
                />
              ) : null}
            </Flex>
          </Box>
        </Grid>
      ) : (
        <Loading />
      )}
    </Container>
  )
}

function ApplicantDialog({
  isValidating,
  onClick,
  recruit,
}: {
  recruit: Applicant
  onClick: () => void
  isValidating: boolean
}) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog.Root open={open} onOpenChange={(open) => setOpen(open)}>
      <Dialog.CleanedUpTrigger css={{ paddingInline: 0 }}>
        <ApplicantCardCompact {...recruit} />
      </Dialog.CleanedUpTrigger>
      <Dialog.Content
        css={{
          minWidth: '75vw',
          overflow: 'auto',
          p: 0,
        }}
      >
        <Flex css={{ m: 'auto', p: '$8' }} direction="column" gap="8">
          <ApplicantProfile
            rightHeaderComponent={
              <Button
                type="secondary"
                onClick={() => {
                  onClick()
                  setOpen(false)
                }}
                loading={isValidating}
              >
                HIRE
              </Button>
            }
          />
          <EmploymentHistory />
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
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
