import Layout from '@/components/Layout'
import { globalStyles } from '@/stitches.config'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
