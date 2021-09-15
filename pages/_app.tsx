import { globalStyles } from '@/stitches.config'
import { Page } from '@geist-ui/react'
import type { AppProps } from 'next/app'
import type { ReactNode } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

function Layout({ children }: { children: ReactNode }) {
  return <Page>{children}</Page>
}
