import { useState } from "react";
import { Grid, Box, Typography, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react"
import axios from "axios";
import { useSessionStorage } from "react-use-storage";
import { UserSession } from "../types";

export default function Login() {
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useSessionStorage<UserSession>("user", {
    username: "",
    email: "",
    userDetailsID: "",
  })
  const { data: session } = useSession()
  const steps = [
    {
      label: "Sign In with Student Mail ID",
      component: (
        <Box>
          <Typography variant="body1" sx={{ mb: 4 }} textAlign='center' fontWeight={600} color='primary.light'>Please sign in with your GCT Email ID to continue</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" color="primary" startIcon={<Google />} onClick={() => signIn('google')}>Sign in with Google</Button>
          </Box>
        </Box>
      )
    },
    {
      label: "Log in with Discord",
      component: (
        <Box>
          <Typography variant="body1" sx={{ mb: 4 }} textAlign='center' fontWeight={600} color='primary.light'>Sign in with your Discord ID</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" color="primary" onClick={() => signIn('discord')}>Sign in with Discord</Button>
          </Box>
        </Box>
      )
    },
    {
      label: "Voila!",
      component: (
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }} fontWeight={800} textAlign="center" color="primary.light">Welcome to the Coding Club</Typography>
        </Box>
      )
    }
  ]
  useEffect(() => {
    if (!session || !session.user) return
    console.log(session.user)
    if (session.user.provider === "google") {
      axios.get(`http://localhost:1337/api/user-details?filters[gctMailId][$eq]=${session.user!.email}&&fields[0]=id&&fields[1]=rollNo`).then(res => {
        if (!res.data.data.length) {
          // TODO: display user not found in database
          console.log("user not found")
        } else {
          setActiveStep(1)
          setUser({ ...user, username: res.data.data[0].attributes.rollNo, userDetailsID: res.data.data[0].id, email: session.user.email! })
        }
      })
    }
    if (session.user.provider === "discord" && user.username) {
      axios.post("http://localhost:1337/api/auth/local/register", {
      username: user.username,
        email: user.email,
        password: String(Math.random()),
        discordUID: session.user.id,
        userDetail: Number(user.userDetailsID)
      }).then(() => {
        setUser({
          username: "",
          email: "",
          userDetailsID: ""
        })
        setActiveStep(2)
      })
    }
    if (activeStep == 2) {
      // TODO
    }
  }, [session, activeStep])

  return (
    <Grid container spacing={0} sx={{ height: { xs: 'auto', sm: '100vh' } }}>
      <Grid item xs={12} sm={6} sx={{ bgcolor: '#f1b900' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', p: { md: 10, sm: 4 } }}>
          <img src="assets/logo.png" alt="logo" />
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ bgcolor: 'black' }}>
        <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center', height: '100%', p: { md: 10, sm: 4 } }}>
          <Typography variant="h2" sx={{ mb: 2 }} fontWeight={800} textAlign="center" color="primary.main">Welcome to the Coding Club Portal</Typography>
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
          <Box sx={{ my: 4 }}>
            {steps[activeStep].component}
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
