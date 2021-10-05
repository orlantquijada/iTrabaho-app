import useUser from '@/utils/hooks/useUser'
import { Button, Modal, Text } from '@geist-ui/react'
import { useRouter } from 'next/dist/client/router'
import { ReactNode, useEffect, useState } from 'react'
import { Box, Container, Flex, Link } from '.'
import Login from './Login'
import Signup from './Signup'
import Image from 'next/image'

export default function Layout({ children }: { children: ReactNode }) {
  const [loginModalState, setLoginModalState] = useState(false)
  const [signupModalState, setSignupModalState] = useState(false)

  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    if (!(router.pathname === '/' || router.pathname === '/jobs') && !user)
      router.push('/')
  }, [router, user])

  return (
    <>
      <Box css={{ height: '100%' }}>
        <header>
          <Flex as={Container} justify="between">
            <Link href="/" css={{ textDecoration: 'none', color: '#191919' }}>
              <Text>iTrabaho</Text>
            </Link>
            {!user ? (
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
            ) : (
              <Flex align="center" gap="2">
                <Image
                  src={`https://avatars.dicebear.com/api/initials/${
                    user.firstName + ' ' + user.lastName
                  }.svg?r=50`}
                  alt=""
                  width={32}
                  height={32}
                />
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
              </Flex>
            )}
          </Flex>
        </header>

        {children}

        <Container as="footer">
          <Link
            href="/links"
            css={{ textDecoration: 'none', color: '#191919' }}
          >
            <Text>links</Text>
          </Link>
        </Container>
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
