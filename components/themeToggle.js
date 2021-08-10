import { useState } from "react";
import styles from '../styles/ThemeToggle.module.scss'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark')

  const toggle = () => {
    if (theme === 'light') {
      document.querySelector('html').setAttribute('data-theme', 'dark')
      setTheme('dark')
    } else {
      document.querySelector('html').setAttribute('data-theme', 'light')
      setTheme('light')
    }
  }

  return (
    <>
      {theme === 'light' &&
        <button className={styles.darkBtn} onClick={() => { toggle() }}></button>
      }
      {theme === 'dark' &&
        <button className={styles.lightBtn} onClick={() => { toggle() }}></button>
      }
    </>
  )
}