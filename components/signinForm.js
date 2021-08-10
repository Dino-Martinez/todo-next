import { signIn, signOut } from 'next-auth/client'
import styles from '../styles/SignIn.module.scss'

export default function SignInForm({ session }) {
  return (
    <article className={styles.content}>
      {!session && 
        <>
          <h2>You must be signed in to use this site.</h2>
          <button className={styles.googleBtn} onClick={() => signIn('google')}></button>
          <p>Sign in with Google</p>
        </>
      }
      {session && 
        <>
          <p> { session.user.name || session.user.email }'s Todo List </p>
          <button className={styles.signoutBtn} onClick={() => signOut()}>Sign out</button>
        </>
      }
    </article>
  )
}