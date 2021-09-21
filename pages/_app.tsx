import Layout from '@/components/Layout'
import { globalStyles } from '@/stitches.config'
import { UserProvider } from '@/utils/hooks/useUser'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  )
}
