import { Button, Modal, Page, Text } from '@geist-ui/react'
import { ReactNode, useState } from 'react'
import { Box, Container, Flex, Link } from '.'
import Login from './Login'
import Signup from './Signup'

export default function Layout({ children }: { children: ReactNode }) {
  const [loginModalState, setLoginModalState] = useState(false)
  const [signupModalState, setSignupModalState] = useState(false)

  return (
    <>
      <Box css={{ height: '100%' }}>
        <Page.Header>
          <Flex as={Container} justify="between">
            <Link href="/" css={{ textDecoration: 'none', color: '#191919' }}>
              <Text>iTrabaho</Text>
            </Link>
            <Flex gapX="4" align="center">
              <Button
                auto
                onClick={() => setLoginModalState(true)}
                style={{ border: 'none' }}
              >
                Login
              </Button>
              <Button
                auto
                type="secondary"
                onClick={() => setSignupModalState(true)}
              >
                Sign Up
              </Button>
            </Flex>
          </Flex>
        </Page.Header>

        {children}

        <Page.Footer></Page.Footer>
      </Box>
      <Modal
        visible={loginModalState}
        onClose={() => setLoginModalState(false)}
      >
        <Modal.Title>Log In</Modal.Title>
        <Modal.Subtitle style={{ textTransform: 'initial' }}>
          Sign into your account here.
        </Modal.Subtitle>
        <Modal.Content>
          <Login />
        </Modal.Content>
      </Modal>

      <Modal
        visible={signupModalState}
        onClose={() => setSignupModalState(false)}
      >
        <Modal.Title>Sign Up</Modal.Title>
        <Modal.Subtitle style={{ textTransform: 'initial' }}>
          Sign up to create Job Posts.
        </Modal.Subtitle>
        <Modal.Content>
          <Signup />
        </Modal.Content>
      </Modal>
    </>
  )
}
