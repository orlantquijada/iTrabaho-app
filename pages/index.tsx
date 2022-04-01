import { Box, Container } from '@/components'
import { Text } from '@geist-ui/react'

export default function Home() {
  return (
    <Container>
      <Box
        css={{
          textAlign: 'center',
          py: '$9',
        }}
      >
        <Text h1 font="59px">
          Welcome to iTrabaho
        </Text>
        <Text
          style={{
            maxWidth: '80%',
            fontSize: '1.5rem',
            lineHeight: 1.5,
            margin: 'auto',
          }}
        >
          Experience the startup ecosystem — invest in startups, research the
          fastest-growing companies, and find a job you love.
        </Text>
      </Box>
    </Container>
  )
}
