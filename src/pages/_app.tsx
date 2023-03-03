import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'
const {myColors} = require("../../themeOveride.js")
const theme = createTheme({
  palette: {
    primary: {
      main: '#f1b900',
      light: "#bbb2b2"
    }
  }
})
import AppContext from '../contexts/app'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useRouter } from 'next/router'
export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<any | null>({})
  const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setSession(user as any)
      } else {
        router.push('/login')
      }
    })
  })
  return <>
    <AppContext.Provider value={{session, setSession: () => setSession}}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContext.Provider>
  </>
}
