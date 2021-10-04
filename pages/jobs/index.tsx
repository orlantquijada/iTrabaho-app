import { Box, Container, Flex, Grid } from '@/components'
import { Text } from '@geist-ui/react'
import { blue } from '@radix-ui/colors'
import JobPostListView from '@/components/JobPost/JobPostListView'

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
        <JobPostListView />
      </Flex>
    </Container>
  )
}
