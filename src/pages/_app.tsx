import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material'
const {myColors} = require("../../themeOveride.js")
const theme = createTheme({
  palette: myColors
})
export default function App({ Component, pageProps }: AppProps) {
  return <>
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
}
