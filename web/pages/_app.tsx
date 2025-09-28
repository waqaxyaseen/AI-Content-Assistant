import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { AppProvider } from '../contexts/AppContext'
import LiveChat from '../components/LiveChat'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
      <LiveChat />
    </AppProvider>
  )
}