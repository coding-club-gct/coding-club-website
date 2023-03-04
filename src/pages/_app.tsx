import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'
import { SessionProvider } from "next-auth/react"
const {myColors} = require("../../themeOveride.js")
const theme = createTheme({
  palette: {
    primary: {
      main: '#f1b900',
      light: "#bbb2b2"
    }
  }
})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps}/>
      </ThemeProvider>
    </SessionProvider>
  ) 
}
