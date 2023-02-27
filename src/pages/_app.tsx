import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'
const {myColors} = require("../../themeOveride.js")
const theme = createTheme({
  palette: myColors
})
import AppContext from '../contexts/app'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase'
export default function App({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<any | null>({})
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setSession(user as any)
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
