import { Grid, Box, Typography, Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useState, useContext, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase";
import AppContext from "../contexts/app";

export default function Login() {
  const [data, setData] = useState<object>({})
  const { session, setSession } = useContext(AppContext)
  useEffect(() => {
    setData(session)
  })
  const handleLogin = () => {
    const provider = new GoogleAuthProvider()
    provider.setCustomParameters({hd: "gct.ac.in"})
    signInWithPopup(auth, provider).then(res => setSession(res.user))
  }
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
              <Button variant="outlined" color="primary" startIcon={<Google />} onClick={handleLogin}>Sign in with Google</Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}