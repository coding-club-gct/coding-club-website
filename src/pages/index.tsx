import { Button } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../contexts/app'
import { auth } from '../services/firebase'
import styles from '../styles/Home.module.css'

export default function Home() {
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
   <div>
    {Object.keys(data).length==0 ? (<Button className="text-error-main" onClick={handleLogin}> Hello </Button>) : (<p>Logged in</p>)}
   </div>
  )
}
