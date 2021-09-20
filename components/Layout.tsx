import { Button, Modal, Page, Text } from '@geist-ui/react'
import { ReactNode, useState } from 'react'
import { Box, Container, Flex, Link } from '.'
import Login from './Login'

export default function Layout({ children }: { children: ReactNode }) {
  const [state, setState] = useState(false)

  return (
    <>
      <Box css={{ height: '100%' }}>
        <Page.Header>
          <Flex as={Container} justify="between">
            <Text>iTrabaho</Text>
            <Flex gapX="4" align="center">
              <Button
                auto
                onClick={() => setState(true)}
                style={{ border: 'none' }}
              >
                Login
              </Button>
              <Link href="/">
                <Button auto type="secondary">
                  Sign Up
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Page.Header>

        {children}

        <Page.Footer></Page.Footer>
      </Box>
      <Modal visible={state} onClose={() => setState(false)}>
        <Modal.Title>Log In</Modal.Title>
        <Modal.Subtitle style={{ textTransform: 'initial' }}>
          Sign into your account here.
        </Modal.Subtitle>
        <Modal.Content>
          <Login />
        </Modal.Content>
      </Modal>
    </>
  )
}
