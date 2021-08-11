
import SignInForm from './signinForm'
import ThemeToggle from './themeToggle'
import styles from '../styles/UtilityHero.module.scss'

export default function UtilityHero({ session }) {
  return (
    <article className={styles.nav}>
      <SignInForm session={session}></SignInForm>
      <ThemeToggle></ThemeToggle>
    </article>
  )
}