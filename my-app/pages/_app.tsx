import type { AppProps } from 'next/app'
import { SettingsProvider } from '../contexts/SettingsContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  )
}

export default MyApp

