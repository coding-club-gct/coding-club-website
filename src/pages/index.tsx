import { useState } from "react";
import { Grid, Box, Typography, Button, Stepper, Step, StepLabel, Modal, styled, makeStyles } from "@mui/material";
import { Check, Google } from "@mui/icons-material";
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react"
import axios from "axios";
import { useSessionStorage } from "react-use-storage";
import { UserSession } from "../types";
import { StepIconProps } from '@mui/material/StepIcon';
import { SERVER_URL } from "../../constants";

export default function Login() {
  const [activeStep, setActiveStep] = useState(0);
  const [modalMessage, setModalMessage] = useState("");
  const [user, setUser] = useSessionStorage<UserSession>("user", {
    username: "",
    email: "",
    userDetailsID: "",
    googleAuthenticated: false,
    discordAuthenticated: false
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
          <Typography variant="h4" sx={{ mb: 2 }} fontWeight={800} textAlign="center" color="primary.light"> 
          Welcome to the Coding Club</Typography>
        </Box>
      )
    }
  ]
  const StepperIconStyledComponentRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
  }>(({ theme, ownerState }) => ({
    borderColor: '#f1b900',
    borderWidth: "1px",
    zIndex: 1,
    color: '#fff',
    width: 30,
    height: 30,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      background: '#f1b900',
      color: "black"
    }),
    ...(ownerState.completed && {
      background: '#f1b900',
      color: "black"
    }),
  }));

  function StepperIconStyledComponent(props: StepIconProps) {
    const { active, completed, className } = props;

    return (
      <StepperIconStyledComponentRoot ownerState={{ completed, active }} className={className}>
        {completed ? <Check sx={{ fontSize: 20 }} /> : props.icon}
      </StepperIconStyledComponentRoot>
    );
  }
  useEffect(() => {
    setActiveStep(user.googleAuthenticated ? user.discordAuthenticated ? 2 : 1 : 0)
  }, [user])
  useEffect(() => {
    if (!session || !session.user) return
    if (session.user.provider === "google") {
      axios.get(`${SERVER_URL}/api/users?filters[email][$eq]=${session.user.email}`, {
        headers: {
          "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_BEARER
        }
      }).then(res => {
        if (res.data.length) {
          setModalMessage("Seems like you have already verified, you can verify only once !")
        }
        else {
          axios.get(`${SERVER_URL}/api/user-details?filters[gctMailId][$eq]=${session.user!.email}&&fields[0]=id&&fields[1]=rollNo&&fields[2]=name`, {
            headers: {
              "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_BEARER
            }
          }).then((res: any) => {
            if (!res.data.data.length) {
              setModalMessage("We cannot find your details in our database. Kindly as your class representative to contact us.")
            } else {
              setUser({ ...user, username: res.data.data[0].attributes.rollNo, userDetailsID: res.data.data[0].id, email: session.user.email!, googleAuthenticated: true })
            }
          })
        }
      }) 
    }
    if (session.user.provider === "discord" && !user.discordAuthenticated) {
      axios.post(`${SERVER_URL}/api/auth/local/register`, {
        username: user.username,
        email: user.email,
        password: String(Math.random()),
        discordUID: session.user.id,
        userDetail: Number(user.userDetailsID)
      }, {
        headers: {
          "Authorization": "Bearer " + process.env.NEXT_PUBLIC_SERVER_BEARER
        }
      }).then(() => {
        setUser({
          username: "",
          email: "",
          userDetailsID: "",
          discordAuthenticated: true,
          googleAuthenticated: true
        })
      }).catch(function (err: any) {

        // setMessage(err.message);
        // setModalMessage(true);
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
          <Typography variant="h2" sx={{ mb: 2 }} fontWeight={800} textAlign="center" color="primary.main">
            Welcome to the Coding Club Portal
            </Typography>
          <Stepper alternativeLabel activeStep={activeStep}>
            {steps.map((step, index) => {
              return (
                <Step key={step.label}>
                  <StepLabel StepIconComponent={StepperIconStyledComponent}>
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
      <Modal
        open={modalMessage.length ? true : false}
        onClose={() => setModalMessage("")}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'black',
          color: "white",
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" color="primary.main" variant="h6" component="h2">
            Oops! There seems to be a problem
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {modalMessage}
          </Typography>
        </Box>
      </Modal>
    </Grid>
  )
}
