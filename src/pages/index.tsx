import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    if (!session) {
      router.push('/login')
    } 
  })
  return (
    <div>
      <h1>Hello World! This is the Home page</h1>
    </div>
  )
}
