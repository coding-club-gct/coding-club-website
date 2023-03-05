import authOptions from '../../pages/api/auth/[...nextauth]'
import { Grid, Box, Typography, Button } from "@mui/material";
import { useSession, signIn, signOut, getProviders } from "next-auth/react"

export default function DiscordAuth() {
  return (
    <Grid container spacing={0} sx={{height: {xs: 'auto', sm: '100vh'}}}>
      <Grid item xs={12} sm={6} sx={{bgcolor: '#f1b900'}}>
        <Box sx={{display: 'flex', alignItems: 'center', height: '100%', p: {md: 10, sm: 4}}}>
          <Box>
            <Typography variant="h2" sx={{mb: 2}} fontWeight={800} textAlign="center" color="secondary.main">Let's get in?</Typography>
            <Typography variant="body1" sx={{mb: 4}} textAlign='center' fontWeight={600} color='secondary.light'>Sign in with your Discord ID</Typography>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Button variant="outlined" color="secondary" onClick={() => signIn('discord')}>Sign in with Discord</Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
          <img src="/assets/discordauth.jpg" alt="logo" />
        </Box>
      </Grid>
    </Grid>
  )
}