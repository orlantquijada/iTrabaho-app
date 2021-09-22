import { Box, Container, Flex, Grid } from '@/components'
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
              <Dialog.Content>
                <Dialog.Title>asdasdads</Dialog.Title>
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

const jobs = [
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
  },
  {
    title: 'Create a social media strategy for my business',
    description:
      'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
    recruiter: 'John Doe',
    role: 'Communications Expert',
  },
]
