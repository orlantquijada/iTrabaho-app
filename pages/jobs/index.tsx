import Image from 'next/image'

import { Box, Container, Flex, Grid } from '@/components'
import { Text } from '@geist-ui/react'
import { blue, gray } from '@radix-ui/colors'
import JobPostListView from '@/components/JobPost/JobPostListView'
import { JobPost, Match, Review, User } from '@/utils/types'
import useUser from '@/utils/hooks/useUser'

export default function JobsList() {
  const user = useUser()

  return (
    <Container
      css={{
        display: 'grid',
        gridTemplateColumns: user ? '20% 1fr 30%' : '20% 1fr',
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
        <JobPostListView />
      </Flex>

      {user ? (
        <Flex direction="column">
          <Text marginTop="0">All Activity</Text>
          {/* activity list */}
          <Flex direction="column" css={{ pl: '1rem' }}>
            <ActivityCard
              currentUser={user}
              datetimeCreated={new Date()}
              type="M"
              content={{
                rank: 1,
                percentage: 80,
                jobPost: {
                  id: 1,
                  barangay: 'Punta Princesa',
                  city: 'Cebu City',
                  datetimeCreated: new Date(),
                  province: 'Cebu',
                  street: '25 Bayabas Ext.',
                  description:
                    'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',

                  title: 'Create a social media strategy for my business',
                  status: 'hiring',
                  role: 'Communications Expert',
                  recruiter: {
                    birthdate: new Date(),
                    firstName: 'Jane',
                    lastName: 'Doe',
                    fullName: 'Jane Doe',
                    phoneNumber: '09222833416',
                    userType: 'R',
                  },
                },
                applicant: {
                  ...user,
                  address: 'Punta Princesa Cebu City',
                  fullName: 'John Doe',
                  birthdate: new Date(),
                  userType: 'A',
                  rep: {
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
                    yearsyearsOfExperience: 4,
                    highestEducationAttained: 'Primary School',
                    experience: [
                      {
                        end_month: 'January',
                        end_year: 2021,
                        start_year: 2020,
                        start_month: 'October',
                        location: 'Punta Princesa Cebu City',
                        role: 'Software Engineer',
                        experienceDetails: [
                          {
                            description: 'wow cool',
                          },
                        ],
                      },
                    ],
                  },
                },
              }}
            />
          </Flex>
        </Flex>
      ) : null}
    </Container>
  )
}

type Props = {
  currentUser: User
  datetimeCreated: Date
}

function ActivityCard(
  props: Props &
    (
      | { type: 'M'; content: Match } // match
      | { type: 'R'; content: Review } // review
      | { type: 'A'; content: JobPost } // accepted
    )
) {
  const description = () => {
    if (props.type === 'R') {
      return (
        <Text margin="0" style={{ fontSize: '0.75rem' }}>
          <strong>{props.content.fromUser.fullName}</strong> rated his job
          experience on job <strong>{props.content.jobPost.title}</strong>{' '}
          <strong>{props.content.rate}</strong> / <strong>5</strong> stars
        </Text>
      )
    } else if (props.type === 'M') {
      if (props.currentUser.userType === 'L') {
        return (
          <Text margin="0" style={{ fontSize: '0.75rem' }}>
            <strong>{props.content.applicant.fullName}</strong> has matched the
            job, <strong>{props.content.jobPost.title}</strong>, posted by{' '}
            <strong>{props.content.jobPost.recruiter.fullName}</strong>
          </Text>
        )
      } else if (props.currentUser.userType === 'R') {
        return (
          <Text margin="0" style={{ fontSize: '0.75rem' }}>
            Your job post <strong>{props.content.jobPost.title}</strong> has
            matched applicant{' '}
            <strong>{props.content.applicant.fullName}</strong>
          </Text>
        )
      }
    } else if (props.type === 'A') {
      return (
        <Text margin="0" style={{ fontSize: '0.75rem' }}>
          <strong>{props.content.recruit.fullName}</strong> has been accepted on
          the job: <strong>{props.content.title}</strong>
        </Text>
      )
    }
  }

  return (
    <Grid
      css={{
        gridTemplateColumns: '1.75rem 1fr',
        alignItems: 'flex-start',
      }}
      gap="1"
    >
      <Image
        src={`https://avatars.dicebear.com/api/initials/${
          'John' + ' ' + 'Doe'
        }.svg?r=50`}
        alt=""
        width={28}
        height={28}
      />
      <Box>
        {description()}
        <Text
          marginBottom="0"
          marginTop="0.25rem"
          style={{ fontSize: '0.75rem', color: gray.gray11 }}
        >
          {props.datetimeCreated.toDateString()}
        </Text>
      </Box>
    </Grid>
  )
}
