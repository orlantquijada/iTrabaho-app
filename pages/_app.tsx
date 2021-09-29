import Layout from '@/components/Layout'
import { globalStyles } from '@/stitches.config'
import { UserProvider } from '@/utils/hooks/useUser'
import { IdProvider } from '@radix-ui/react-id'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <UserProvider>
      <IdProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IdProvider>
    </UserProvider>
  )
}
