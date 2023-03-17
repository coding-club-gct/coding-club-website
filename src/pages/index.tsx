import { useState } from "react";
import { Grid, Box, Typography, Button, Stepper, Step, StepLabel, StepContent } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";

export default function Login() {
  const [activeStep, setActiveStep] = useState(0);
  const [provider, setProvider] = useState('google')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [discordUID, setUID] = useState()
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const { data: session } = useSession()
  const steps = [
    {
      label: "Sign In with Student Mail ID",
      component: (
        <Box>
          <Typography variant="body1" sx={{mb: 4}} textAlign='center' fontWeight={600} color='primary.light'>Please sign in with your GCT Email ID to continue</Typography>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="outlined" color="primary" startIcon={<Google />} onClick={() => signIn('google')}>Sign in with Google</Button>
          </Box>
        </Box>
      )
    },
    {
      label: "Log in with Discord",
      component: (
        <Box>
          <Typography variant="body1" sx={{mb: 4}} textAlign='center' fontWeight={600} color='primary.light'>Sign in with your Discord ID</Typography>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="outlined" color="primary" onClick={() => signIn('discord')}>Sign in with Discord</Button>
          </Box>
        </Box>
      )
    },
    {
      label: "Voila!",
      component: (
        <Box>
          <Typography variant="h4" sx={{mb: 2}} fontWeight={800} textAlign="center" color="primary.light">Welcome to the Coding Club</Typography>
        </Box>
      )
    }
  ]
  useEffect(() => {
    if (session) {
      if (provider == "google") {
        setActiveStep(1);
        setProvider("discord")
        setName(session.user?.name)
        setEmail(session.user?.email)
      } else if (provider == "discord") {
        setUID(session.user?.id)
        fetch('http://127.0.0.1:1337/api/register', {
          method: "POST",
          body: JSON.stringify({
            name: name,
            email: email,
            userid: email.split("@")[0],
            password: email.split("@")[0],
            discorduid: discordUID
          }),
          headers: {
            'Content-Type': "application.json",
            "Authentication-Token": ""
          }
        }).then(res => {
          
        }).finally(() => setActiveStep(2))
      }
    }
  }, [session])

  return (
    <Grid container spacing={0} sx={{height: {xs: 'auto', sm: '100vh'}}}>
      <Grid item xs={12} sm={6} sx={{bgcolor: '#f1b900'}}>
        <Box sx={{display: 'flex', alignItems: 'center', height: '100%', p: {md: 10, sm: 4}}}>
          <img src="assets/logo.png" alt="logo" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{bgcolor: 'black'}}>
        <Box sx={{display: 'flex', flexDirection: "column", alignItems: 'center', height: '100%', p: {md: 10, sm: 4}}}>
          <Typography variant="h2" sx={{mb: 2}} fontWeight={800} textAlign="center" color="primary.main">Welcome to the Coding Club Portal</Typography>
          <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => {
            return (
              <Step key={step.label}>
                <StepLabel color="secondary">
                  <Typography color="white">{step.label}</Typography>
                </StepLabel>
              </Step>
            );
          })}
          </Stepper>
          <Box sx={{my: 4}}>
            {steps[activeStep].component}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOptions);
//   if (session) {
//     return { redirect: { destination: "/auth/discord" } };
//   }
//   const providers = await getProviders();
//   return {
//     props: { providers: providers ?? [] },
//   }
// }