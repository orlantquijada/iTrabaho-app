import { Badge, Box, Container, Flex, Grid } from '@/components'
import ApplicantCardCompact from '@/components/ApplicantCardCompact'
import { css } from '@/stitches.config'
import {
  useJobPost,
  acceptJobPost,
  completeJobPost,
} from '@/utils/hooks/useJobPost'
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
import { useRef, useState } from 'react'
import ReviewForm, { FormFields } from '@/components/ReviewForm'
import { useForm } from 'react-hook-form'
import { useApplicants } from '@/utils/hooks/useApplicants'
import { createReview } from '@/utils/api/lib'
import { useApplicant } from '@/utils/hooks/useApplicant'

const border = `1px solid ${slate.slate6}`

export default function JobDetail() {
  const router = useRouter()
  const { id } = router.query
  const jobId = Number(id)
  const { job, isLoading, mutate, isValidating } = useJobPost(jobId)
  const { applicants, isLoading: isLoadingApplicantsList } = useApplicants({
    params: { jobPostId: jobId },
  })
  const { bindings, setVisible } = useModal()
  const methods = useForm<FormFields>({
    mode: 'onTouched',
    defaultValues: { rate: 0 },
  })
  const recruit = useRef<Applicant>()

  const handleSubmit = methods.handleSubmit(async (values) => {
    await createReview({
      ...values,
      jobId,
    })
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
                title="Posted On"
                content={job.datetimeCreated.toDateString()}
              />
              {job.status === 'active' ? (
                <Button
                  type="secondary"
                  onClick={() => {
                    recruit.current = job.recruit
                    mutate(async () => await completeJobPost(jobId))
                    setVisible(true)
                  }}
                >
                  Finish Job
                </Button>
              ) : null}

              <Modal {...bindings}>
                <Modal.Title>Feedback</Modal.Title>
                <Modal.Subtitle style={{ textTransform: 'initial' }}>
                  How would you rate{' '}
                  <span style={{ fontWeight: 700 }}>
                    {recruit.current?.fullName}
                  </span>
                  ?
                </Modal.Subtitle>
                <Modal.Content>
                  <ReviewForm handleSubmit={handleSubmit} methods={methods} />
                </Modal.Content>
                <Modal.Action passive onClick={() => setVisible(false)}>
                  Cancel
                </Modal.Action>
                <Modal.Action onClick={handleSubmit}>Submit</Modal.Action>
              </Modal>
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
                    !isLoadingApplicantsList && applicants ? (
                      applicants.length === 0 ? (
                        <Text>No applicants currently!</Text>
                      ) : (
                        <Grid
                          gap="2"
                          css={{
                            gridTemplateColumns:
                              'repeat(auto-fill, minmax(200px,1fr))',
                          }}
                        >
                          {applicants.map((recruit, index) => (
                            <ApplicantDialog
                              recruit={recruit}
                              isValidating={isValidating}
                              onClick={() => {
                                mutate(
                                  async () =>
                                    await acceptJobPost(jobId, recruit.id)
                                )
                              }}
                              key={index}
                            />
                          ))}
                        </Grid>
                      )
                    ) : (
                      <Loading />
                    )
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
  const { applicant, isLoading } = useApplicant(recruit.id)
  const [open, setOpen] = useState(false)

  if (!isLoading && applicant)
    return (
      <Dialog.Root open={open} onOpenChange={(open) => setOpen(open)}>
        <Dialog.CleanedUpTrigger css={{ paddingInline: 0 }}>
          <ApplicantCardCompact {...applicant} />
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
              applicant={applicant}
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
            <EmploymentHistory experiences={applicant.profile.experiences} />
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    )

  return <Loading />
}

const jobTitle = css({
  fontSize: '1.625rem',
  fontWeight: 700,
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
