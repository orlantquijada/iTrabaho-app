import { Badge, Box, Container, Flex, Grid } from '@/components'
import { JobPostCard } from '@/components/JobPostCard'
import { styled } from '@/stitches.config'
import { Text } from '@geist-ui/react'
import { slate, blue } from '@radix-ui/colors'
import * as Dialog from '@/components/Dialog'

export default function JobsList() {
  return (
    <Container
      css={{
        display: 'grid',
        gridTemplateColumns: '25% 1fr',
        py: '$6',
        position: 'relative',
      }}
    >
      <Box css={{ position: 'sticky', top: '2rem', height: 'fit-content' }}>
        <Text h4 marginBottom="1rem" paddingLeft="0.5rem" marginTop="0">
          Categories
        </Text>
        {/* TODO: filter job posts per category */}
        <Grid
          flow="row"
          css={{
            '& > p': {
              m: 0,
              cursor: 'pointer',
              transition: 'all 200ms ease',
              py: '0.5rem',
              pl: '0.5rem',
              rl: '$pill',
              '&:hover': { color: blue.blue9, background: blue.blue4 },
            },
          }}
        >
          <Text>Web Development</Text>
          <Text>Marketing</Text>
          <Text>Carpentry</Text>
          <Text>Construction</Text>
        </Grid>
      </Box>
      <Flex direction="column">
        <Text h1 marginTop="0">
          Jobs For You
        </Text>
        <JobsListContainer>
          {jobs.map((job, index) => (
            <Dialog.Root key={index}>
              <Dialog.CleanedUpTrigger>
                <JobPostCard
                  title={job.title}
                  description={job.description}
                  recruiter={job.recruiter}
                  role={job.role}
                />
              </Dialog.CleanedUpTrigger>
              <Dialog.Content css={{ minWidth: '800px' }}>
                <Flex justify="between" align="center" css={{ mb: '1.25rem' }}>
                  <Flex gap="2">
                    <Dialog.Title
                      css={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        transition: 'color 200ms ease',
                      }}
                    >
                      {job.title}
                    </Dialog.Title>
                  </Flex>
                  <Badge>{job.role}</Badge>
                </Flex>

                <Grid css={{ gridTemplateColumns: '1fr 30%' }} gap="4">
                  <Flex direction="column">
                    <SectionTitle>Description</SectionTitle>
                    <Text p margin="0">
                      {job.description}
                    </Text>
                  </Flex>

                  <Flex direction="column" gap="1">
                    <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                      <SectionTitle>Recruiter</SectionTitle>
                      <Text margin="0">{job.recruiter}</Text>
                    </Grid>

                    {job.status !== 'hiring' ? (
                      <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                        <SectionTitle>Recruit</SectionTitle>
                        <Text margin="0">{job.recruit}</Text>
                      </Grid>
                    ) : null}

                    <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                      <SectionTitle>Location</SectionTitle>
                      <Text margin="0">{job.address}</Text>
                    </Grid>

                    <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                      <SectionTitle>Status</SectionTitle>
                      <Badge
                        variant={job.status}
                        css={{ textTransform: 'capitalize' }}
                      >
                        {job.status}
                      </Badge>
                    </Grid>

                    <Grid css={{ gridTemplateColumns: '30% 1fr' }}>
                      <SectionTitle>Posted On</SectionTitle>
                      <Text margin="0">
                        {job.datetimeCreated.toDateString()}
                      </Text>
                    </Grid>
                  </Flex>
                </Grid>
              </Dialog.Content>
            </Dialog.Root>
          ))}
        </JobsListContainer>
      </Flex>
    </Container>
  )
}

const JobsListContainer = styled('div', {
  $$border: `1px solid ${slate.slate6}`,
  borderInline: '$$border',
  borderTop: '$$border',

  '& > button': {
    borderBottom: '$$border',
  },
})

const SectionTitle = styled('span', {
  fontSize: '0.875rem',
  fontWeight: 600,
  letterSpacing: '-0.003em',
  lineHeight: '24px',
})

const jobs: Array<
  | {
      title: string
      description: string
      recruiter: string
      recruit: string
      role: string
      status: 'done' | 'active'
      address: string
      datetimeCreated: Date
    }
  | {
      title: string
      description: string
      recruiter: string
      role: string
      status: 'hiring'
      address: string
      datetimeCreated: Date
    }
> = [
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    recruit: 'Jane Doe',
    role: 'Communications Expert',
    status: 'active',
    address: '221B Baker St. London, UK',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',

    recruit: 'Jane Doe',
    role: 'Communications Expert',
    status: 'done',
    address: '221B Baker St. London, UK',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
    status: 'hiring',
    address: '221B Baker St. London, UK',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
    status: 'hiring',
    address: '221B Baker St. London, UK',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    recruit: 'Jane Doe',
    role: 'Communications Expert',
    status: 'done',
    address: '221B Baker St. London, UK',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    recruit: 'Jane Doe',
    role: 'Communications Expert',
    status: 'active',
    address: '221B Baker St. London, UK',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
    status: 'hiring',
    address: '221B Baker St. London, UK',
    datetimeCreated: new Date(),
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    recruit: 'Jane Doe',
    role: 'Communications Expert',
    status: 'active',
    address: '221B Baker St. London, UK',
    datetimeCreated: new Date(),
  },
]
