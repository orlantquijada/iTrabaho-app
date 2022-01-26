import Image from 'next/image'

import { Grid, Box, Flex, Badge } from '@/components'
import { slate } from '@radix-ui/colors'
import { css } from '@/stitches.config'
import { Text } from '@geist-ui/react'
import WorkHistoryCard from './WorkHistoryCard'
import * as Tabs from './Tabs'

import type { ExtendedApplicant } from '@/utils/types'
import type { ReactNode } from 'react'

const border = `1px solid ${slate.slate6}`

interface Props {
  rightHeaderComponent?: ReactNode
  applicant: ExtendedApplicant
}

export default function ApplicantProfile({
  applicant,
  rightHeaderComponent,
}: Props) {
  return (
    <Grid
      css={{
        gridTemplateColumns: '30% 1fr',
        gridTemplateAreas: '"header header" "side main"',
        border,
      }}
    >
      <Flex
        css={{ gridArea: 'header', borderBottom: border, padding: '2rem' }}
        justify="between"
        align="center"
      >
        <Grid css={{ gridTemplateColumns: '4rem 1fr', gap: '1.5rem' }}>
          <Image
            alt="Profile Picture"
            src={`https://avatars.dicebear.com/api/initials/${applicant.fullName}.svg?r=50&size=60`}
            width={60}
            height={60}
          />
          <Box>
            <Text h1 className={name()}>
              {applicant.fullName}
            </Text>
            <Text className={address()}>
              {[
                applicant.rep.barangay,
                applicant.rep.city,
                applicant.rep.province,
              ].join(', ')}
            </Text>
          </Box>
        </Grid>
        {rightHeaderComponent}
      </Flex>
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
            {applicant.skills.map((skill) => (
              <Badge key={skill.id} css={{ fontWeight: 500 }}>
                {skill.name}
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
              <Tabs.Trigger value="completed" css={{ border: 'none' }}>
                Completed Jobs ({applicant.doneJobs.length})
              </Tabs.Trigger>
              <Tabs.Trigger value="in-progress" css={{ border: 'none' }}>
                In progress ({applicant.activeJobs.length})
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="completed">
              {applicant.doneJobs.map((job) => (
                <WorkHistoryCard {...job} key={job.id} />
              ))}
            </Tabs.Content>
            <Tabs.Content value="in-progress">
              {applicant.activeJobs.map((job) => (
                <WorkHistoryCard {...job} key={job.id} />
              ))}
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Box>
    </Grid>
  )
}

const name = css({
  fontSize: '1.625rem',
  fontWeight: 500,
  margin: 0,
  marginBottom: '$2',
})
const address = css({
  fontSize: '0.875rem',
  margin: 0,
  color: '#444 !important',
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
const moreDetailsSectionTitle = css({
  margin: 0,
  marginBottom: '$2',
  fontWeight: 500,
})
const mainContentSectionTitle = css({
  margin: 0,
  marginBottom: '$2',
  fontSize: '1.125rem',
  fontWeight: 500,
})

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

// const skills: string[] = [
//   'UI/UX',
//   'Figma',
//   'Web Design',
//   'NextJS',
//   'CSS-in-JS',
//   'Sass',
//   'Typescript',
// ]
