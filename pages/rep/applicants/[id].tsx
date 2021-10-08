import Image from 'next/image'

import { Badge, Box, Container, Flex, Grid } from '@/components'
import * as Tabs from '@/components/ApplicantProfile/Tabs'
import { css } from '@/stitches.config'
import {
  ActiveJobPost,
  Applicant,
  DoneJobPost,
  Experience,
  Recruiter,
} from '@/utils/types'
import { Text } from '@geist-ui/react'
import { slate } from '@radix-ui/colors'
import WorkHistoryCard from '@/components/ApplicantProfile/WorkHistoryCard'

const border = `1px solid ${slate.slate6}`

export default function ApplicantDetail() {
  return (
    <Container css={{ py: '$6', display: 'grid', gap: '2rem' }}>
      <Grid
        css={{
          gridTemplateColumns: '30% 1fr',
          gridTemplateAreas: '"header header" "side main"',
          border,
        }}
      >
        <Grid
          css={{
            gridArea: 'header',
            borderBottom: border,
            padding: '2rem',
            gridTemplateColumns: '4rem 1fr',
            gap: '1.5rem',
          }}
        >
          <Image
            alt="Profile Picture"
            src={`https://avatars.dicebear.com/api/initials/${
              'John' + ' ' + 'Doe'
            }.svg?r=50&size=60`}
            width={60}
            height={60}
          />
          <Box>
            <Text h1 className={name()}>
              John Doe
            </Text>
            <Text className={address()}>
              25 Bayabas Ext., Punta Princesa, Cebu City, Philippines
            </Text>
          </Box>
        </Grid>
        <Box as="aside" css={{ gridArea: 'side', borderRight: border }}>
          <Flex
            as="section"
            justify="between"
            css={{ borderBottom: border, padding: '1.25rem 2rem' }}
          >
            {metrics.map((metric) => (
              <Box key={metric.label}>
                <Text className={metricValue()}>{metric.value}</Text>
                <Text className={metricLabel()}>{metric.label}</Text>
              </Box>
            ))}
          </Flex>

          <Box as="section" css={{ padding: '1.25rem 2rem' }}>
            <Text className={moreDetailsSectionTitle()}>Skills</Text>
            <Flex css={{ flexWrap: 'wrap' }} gap="2">
              {skills.map((skill) => (
                <Badge key={skill} css={{ fontWeight: 500 }}>
                  {skill}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Box>

        <Box css={{ gridArea: 'main' }}>
          <Box as="section" css={{ paddingBlock: '2rem' }}>
            <Text
              h2
              className={mainContentSectionTitle({
                css: { paddingInline: '2rem' },
              })}
            >
              Work History
            </Text>
            <Tabs.Root defaultValue="completed">
              <Tabs.List>
                <Tabs.Trigger value="completed">
                  Completed Jobs (45)
                </Tabs.Trigger>
                <Tabs.Trigger value="in-progress">
                  In progress (25)
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="completed">
                <WorkHistoryCard {...job2} />
              </Tabs.Content>
              <Tabs.Content value="in-progress">
                <WorkHistoryCard {...job} />
              </Tabs.Content>
            </Tabs.Root>
          </Box>
        </Box>
      </Grid>

      <Box css={{ border }}>
        <Box css={{ padding: '1.5rem 2rem', borderBottom: border }}>
          <Text h2 className={sectionTitlte()}>
            Employment History
          </Text>
        </Box>

        <Box css={{ paddingInline: '2rem' }}>
          {recruit.profile.experience.map((experience, index) => (
            <ExperienceCard {...experience} key={index} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}

function ExperienceCard(props: Experience) {
  return (
    <Box
      css={{
        paddingBlock: '1.25rem',
        '&:not(:last-of-type)': { borderBottom: border },
      }}
    >
      <Text h4 className={role()}>
        {props.role}
        {props.company ? ` | ${props.company}` : null}
      </Text>
      <Text className={dates()}>
        {props.start_month} {props.start_year} - {props.end_month}{' '}
        {props.end_year}
      </Text>
      <ul
        style={{
          paddingInline: '1.25rem',
          margin: 0,
          display: 'grid',
          gap: '0.25rem',
        }}
      >
        {props.experienceDetails.map((detail, index) => (
          <li
            style={{
              fontSize: '0.875rem',
              color: '#222',
              lineHeight: '20px',
              letterSpacing: 0.35,
            }}
            key={index}
          >
            {detail.description}
          </li>
        ))}
      </ul>
    </Box>
  )
}

const dates = css({
  margin: '1rem 0 0.5rem',
  fontSize: '0.875rem',
  color: '#656565 !important',
})

const sectionTitlte = css({
  margin: 0,
  fontSize: '1.5rem',
  fontWeight: 500,
})

const role = css({
  margin: 0,
  fontWeight: 500,
})

const recruiter: Recruiter = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+639222833416',
  fullName: 'John Doe',
  birthdate: new Date(),
  userType: 'R',
}
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

const job2: DoneJobPost = {
  title: 'Create a social media strategy for my business',
  description:
    'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
  recruiter,
  recruit,
  recruiterReview: {
    comment:
      'Very nice client. Sets clear requirements and reasonable expectations. Will definitely work with him again in the future if needed.',
    fromUser: recruit,
    toUser: recruiter,
    rate: 5,
  },
  recruitReview: {
    comment:
      'I highly recommend Francis for your projects. I am very pick when it comes to the people I work with, since these are my life time projects. And he has been more than helpful and very professional.',
    fromUser: recruiter,
    toUser: recruit,
    rate: 4,
  },
  role: 'Communications Expert',
  status: 'done',
  street: '25 Sesame St.,',
  barangay: 'Punta Princesa',
  city: 'Cebu City',
  province: 'Cebu',
  datetimeCreated: new Date(),
  datetimeEnded: new Date(),
}

const job: ActiveJobPost = {
  title: 'Create a social media strategy for my business',
  description:
    'Social media strategy developed for your campaign, event, or general business promotion. I have 16 years of experience developing social media strategies and content, including copy and graphics. The strategy will include a review of your social media and recommendations on how improve/leverage/expand your social marketing efforts.',
  recruiter,
  recruit,
  recruiterReview: {
    comment:
      'Very nice client. Sets clear requirements and reasonable expectations. Will definitely work with him again in the future if needed.',
    fromUser: recruit,
    toUser: recruiter,
    rate: 5,
  },
  recruitReview: {
    comment: 'John is by far the best! Highly recommended',
    fromUser: recruiter,
    toUser: recruit,
    rate: 4,
  },
  role: 'Communications Expert',
  status: 'active',
  street: '25 Sesame St.,',
  barangay: 'Punta Princesa',
  city: 'Cebu City',
  province: 'Cebu',
  datetimeCreated: new Date(),
}

const skills: string[] = [
  'UI/UX',
  'Figma',
  'Web Design',
  'NextJS',
  'CSS-in-JS',
  'Sass',
  'Typescript',
]
const metrics: Array<{ label: string; value: string }> = [
  {
    label: 'Total Jobs',
    value: '30',
  },
  {
    label: 'Rating',
    value: '4.8',
  },
  {
    label: 'Reviews',
    value: '45',
  },
]

const mainContentSectionTitle = css({
  margin: 0,
  marginBottom: '$2',
  fontSize: '1.125rem',
  fontWeight: 500,
})
const moreDetailsSectionTitle = css({
  margin: 0,
  marginBottom: '$2',
  fontWeight: 500,
})
const metricValue = css({
  fontSize: '1.125rem',
  fontWeight: 700,
  margin: 0,
})
const metricLabel = css({
  fontSize: '0.75rem',
  margin: 0,
  color: '#111 !important',
})
const address = css({
  fontSize: '0.875rem',
  margin: 0,
  color: '#444 !important',
})
const name = css({
  fontSize: '1.625rem',
  fontWeight: 500,
  margin: 0,
  marginBottom: '$2',
})
