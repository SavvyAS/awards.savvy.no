import { AppProps } from 'next/app'
import '@/styles/globals.scss'
import Layout from './layout'
import Head from 'next/head'
import content from '@/lib/content.json'
import { Pages } from '@/lib/content.interface'
import Script from 'next/script'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content=""></meta>
        <title>Savvy Awards</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
