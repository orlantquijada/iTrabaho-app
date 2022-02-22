import Image from 'next/image'

import { Box, Container, Flex, Grid } from '@/components'
import { Loading, Text } from '@geist-ui/react'
import { gray } from '@radix-ui/colors'
import JobPostListView from '@/components/JobPost/JobPostListView'
import { css } from '@/stitches.config'
import useUser from '@/utils/hooks/useUser'
import { useJobPosts } from '@/utils/hooks/useJobPosts'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import type { Activity, User } from '@/utils/types'
import { useActivities } from '@/utils/hooks/useActivities'

export default function JobsList() {
  const { jobs, isLoading } = useJobPosts({ params: { status: 'H' } })
  const router = useRouter()
  const [jobId, setJobId] = useState<number | undefined>(undefined)
  const user = useUser()
  const { activities, isLoading: isLoadingActivities } = useActivities()

  useEffect(() => {
    const handleRouteChange = () => {
      const urlParams = new URLSearchParams(window.location.search)
      setJobId(Number(urlParams.get('job')) || undefined)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Container
      css={{
        display: 'grid',
        gridTemplateColumns: user ? '1fr 30%' : '1fr',
        py: '$6',
        position: 'relative',
        gap: '$4',
      }}
    >
      <Flex direction="column">
        <Text h1 style={{ marginTop: 0 }}>
          Available Jobs
        </Text>
        {!isLoading && jobs ? (
          <JobPostListView jobId={jobId} jobs={jobs} />
        ) : (
          <Loading />
        )}
      </Flex>

      {user ? (
        <Flex direction="column" className={sticky({ css: { pt: '1rem' } })}>
          <Text style={{ paddingLeft: '1rem', marginTop: 0 }}>
            All Activity
          </Text>
          {/* activity list */}
          <Flex direction="column" gap="2" css={{ pl: '1rem' }}>
            {!isLoadingActivities && activities ? (
              activities.length === 0 ? (
                <Text style={{ margin: 0, fontSize: '0.75rem' }}>
                  No activities!
                </Text>
              ) : (
                activities.map((activity, index) => (
                  <ActivityCard
                    key={index}
                    currentUser={user}
                    datetimeCreated={activity.datetimeCreated}
                    type={activity.type as any}
                    content={activity.content as any}
                  />
                ))
              )
            ) : (
              <Loading />
            )}
          </Flex>
        </Flex>
      ) : null}
    </Container>
  )
}

type Props = {
  currentUser: User
}

function ActivityCard(props: Props & Activity) {
  // TODO: clean up texts
  const description = () => {
    if (props.type === 'R') {
      if (props.currentUser.userType === 'L') {
        return (
          <Text style={{ fontSize: '0.75rem', margin: 0 }}>
            <strong>{props.content.fromUser.fullName}</strong> rated his job
            experience on job <strong>{props.content.jobPost.title}</strong>{' '}
            <strong>{props.content.rate}</strong> / <strong>5</strong> stars
          </Text>
        )
      } else if (props.currentUser.userType === 'R') {
        return (
          <Text style={{ fontSize: '0.75rem', margin: 0 }}>
            <strong>You</strong> rated{' '}
            <strong>{props.content.toUser.fullName}</strong> on job{' '}
            <strong>{props.content.jobPost.title}</strong>{' '}
            <strong>{props.content.rate}</strong> / <strong>5</strong> stars
          </Text>
        )
      }
    } else if (props.type === 'M') {
      if (props.currentUser.userType === 'L') {
        return (
          <Text style={{ fontSize: '0.75rem', margin: 0 }}>
            <strong>{props.content.applicant.fullName}</strong> has matched the
            job, <strong>{props.content.jobPost.title}</strong>, posted by{' '}
            <strong>{props.content.jobPost.recruiter.fullName}</strong>
          </Text>
        )
      } else if (props.currentUser.userType === 'R') {
        return (
          <Text style={{ fontSize: '0.75rem', margin: 0 }}>
            Your job post <strong>{props.content.jobPost.title}</strong> has
            matched applicant{' '}
            <strong>{props.content.applicant.fullName}</strong>
          </Text>
        )
      }
    } else if (props.type === 'A') {
      if (props.currentUser.userType === 'L') {
        return (
          <Text style={{ fontSize: '0.75rem', margin: 0 }}>
            <strong>{props.content.recruit.fullName}</strong> has been accepted
            on the job: <strong>{props.content.title}</strong>
          </Text>
        )
      } else if (props.currentUser.userType === 'R') {
        return (
          <Text style={{ fontSize: '0.75rem', margin: 0 }}>
            <strong>You</strong> accepted{' '}
            <strong>{props.content.recruit.fullName}</strong> on the job:{' '}
            <strong>{props.content.title}</strong>
          </Text>
        )
      }
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
          style={{
            marginTop: '0.25rem',
            marginBottom: 0,
            fontSize: '0.75rem',
            color: gray.gray11,
          }}
        >
          {props.datetimeCreated.toDateString()}
        </Text>
      </Box>
    </Grid>
  )
}

const sticky = css({
  position: 'sticky',
  top: '3.5rem',
  height: 'fit-content',
})
