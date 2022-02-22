import useUser, { logout } from '@/utils/hooks/useUser'
import { Button, Modal, Text } from '@geist-ui/react'
import { useRouter } from 'next/dist/client/router'
import { ReactNode, useEffect, useState } from 'react'
import { Box, Container, Flex, Link } from '.'
import Login from './Login'
import Signup from './Signup'
import Image from 'next/image'
import { css } from '@/stitches.config'
import { mauve, slate } from '@radix-ui/colors'
import { PlusIcon, ExitIcon } from '@radix-ui/react-icons'
import { User } from '@/utils/types'
import * as Popover from '@/components/Popover'

const links: Record<
  Exclude<User['userType'], 'A'>,
  Array<{
    href: string
    title: string
    create?: boolean
  }>
> = {
  L: [
    { href: '/', title: 'Home' },
    { href: '/rep/applicants', title: 'Applicants' },
    { href: '/jobs', title: 'Jobs' },
    { href: '/rep/applicants/create', title: 'Add Applicant', create: true },
  ],
  R: [
    { href: '/', title: 'Home' },
    { href: '/jobs', title: 'Jobs' },
    { href: '/rec/my-jobs', title: 'My Jobs' },
    { href: '/jobs/create', title: 'Create Job Post', create: true },
  ],
}

export default function Layout({ children }: { children: ReactNode }) {
  const [loginModalState, setLoginModalState] = useState(false)
  const [signupModalState, setSignupModalState] = useState(false)

  const router = useRouter()
  const user = useUser()

  useEffect(() => {
    if (
      !(
        router.pathname === '/' ||
        router.pathname === '/jobs' ||
        router.pathname.startsWith('/rep/applicants/')
      ) &&
      !user
    )
      router.push('/')
  }, [router, user])

  const nav =
    user?.userType === 'L' || user?.userType === 'R'
      ? links[user.userType]
      : [
          { href: '/', title: 'Home' },
          { href: '/jobs', title: 'Jobs' },
        ]

  return (
    <>
      <Box css={{ height: '100%' }}>
        <header className={headerBottomShadow()}>
          <Flex as={Container} justify="between" align="center">
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
              <Popover.Root>
                <Popover.CleanupTrigger>
                  <Flex
                    align="center"
                    gap="2"
                    css={{
                      color: '$gray11',
                      transition: 'color 200ms ease',
                      '&:hover': { color: '$gray12' },
                    }}
                  >
                    <Image
                      src={`https://avatars.dicebear.com/api/initials/${
                        user.firstName + ' ' + user.lastName
                      }.svg?r=50`}
                      alt=""
                      width={28}
                      height={28}
                    />
                    <Text>
                      {user.firstName} {user.lastName}
                    </Text>
                  </Flex>
                </Popover.CleanupTrigger>
                <Popover.Content>
                  <button className={button()} onClick={logout}>
                    <ExitIcon />
                    <Text className={buttonText()}>Log Out</Text>
                  </button>
                </Popover.Content>
              </Popover.Root>
            )}
          </Flex>
        </header>

        <Flex
          className={headerBottomShadow()}
          css={{
            height: '2.5rem',
            position: 'sticky',
            top: 0,
            background: 'White',
            zIndex: '$3',
          }}
          align="center"
          justify="center"
        >
          {nav?.map((link) => (
            <Link
              href={link.href}
              className={navButtonStyles({
                active:
                  router.pathname === '/'
                    ? router.pathname === link.href
                    : router.pathname.startsWith(link.href) &&
                      link.href !== '/' &&
                      !router.pathname.includes('/create') !==
                        Boolean(link.create),
              })}
              key={link.title}
            >
              {link.create ? <PlusIcon style={{ marginRight: '6px' }} /> : null}
              <Text span>{link.title}</Text>
            </Link>
          ))}
        </Flex>

        {children}
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
          <Login setLoginModalState={setLoginModalState} />
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

const button = css({
  display: 'flex',
  alignItems: 'center',
  background: 'none',
  border: 'none',
  width: '100%',
  gap: '0.5rem',
  cursor: 'pointer',
  borderRadius: '$1',

  padding: '0.5rem',

  '&:hover': {
    backgroundColor: '$gray4',
  },
})

const buttonText = css({
  margin: 0,
  fontSize: '0.875rem',
})

export const headerBottomShadow = css({
  boxShadow: `inset 0 -1px ${mauve.mauve5}`,
})

export const navButtonStyles = css({
  fontFamily: '$default',
  fontWeight: 500,
  textDecoration: 'none',

  userSelect: 'none',
  cursor: 'pointer',
  WebkitTapHighlightColor: 'transparent',
  transition: 'opacity 200ms',

  display: 'grid',
  placeItems: 'center',
  gridAutoFlow: 'column',

  padding: '5px 0.75rem',
  opacity: 0.5,
  fontSize: '0.875rem',
  color: slate.slate12,

  '&:hover': {
    opacity: 1,
  },

  variants: {
    active: {
      true: {
        opacity: 1,
      },
    },
  },
})
