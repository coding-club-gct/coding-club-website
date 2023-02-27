import { Button } from '@mui/material'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Head from 'next/head'
import Image from 'next/image'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../contexts/app'
import { auth } from '../services/firebase'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <h1>Hello World! This is the Home page</h1>
    </div>
  )
}
