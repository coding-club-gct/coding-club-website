import { Grid, Box, Typography, Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/router";

export default function Login() {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session) {
      router.push('/')
    }
  })
  return (
    <Grid container spacing={0} sx={{height: {xs: 'auto', sm: '100vh'}}}>
      <Grid item xs={12} sm={6} sx={{bgcolor: '#f1b900'}}>
        <Box sx={{display: 'flex', alignItems: 'center', height: '100%', p: {md: 10, sm: 4}}}>
          <img src="assets/logo.png" alt="logo" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{bgcolor: 'black'}}>
        <Box sx={{display: 'flex', alignItems: 'center', height: '100%', p: {md: 10, sm: 4}}}>
          <Box>
            <Typography variant="h2" sx={{mb: 2}} fontWeight={800} textAlign="center" color="primary.main">Welcome to the Coding Club Portal</Typography>
            <Typography variant="body1" sx={{mb: 4}} textAlign='center' fontWeight={600} color='primary.light'>Please sign in with your GCT Email ID to continue</Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Button variant="outlined" color="primary" startIcon={<Google />} onClick={() => signIn()}>Sign in with Google</Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}