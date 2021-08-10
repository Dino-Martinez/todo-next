import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { useState, useEffect } from 'react'
import TodoForm from '../components/todoForm'
import TodoList from '../components/todoList'
import SignInForm from '../components/signinForm'
import styles from '../styles/Main.module.scss'

export default function Home() {
  const [ session, loading ] = useSession()
  const [ todos, setTodos ] = useState(null)

  const fetchTodos = async() => {
    const res = await fetch(`/api/todos/${session.user.email}`)
    const json = await res.json()

    setTodos(json)
  }

  useEffect(()=>{
    if (session)
      fetchTodos()
  }, [session])

  return (
    <>
      <Head>
         <title>Todo Planner</title>
         <link key="1" rel="icon" href="/favicon.ico" />
         <link key="2" rel="preconnect" href="https://fonts.googleapis.com" />
         <link key="3" rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
         <link key="4" href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet"></link>
      </Head>

      <SignInForm session={session}></SignInForm>
      {session && 
        <main className={styles.main}>
          <TodoForm session={session} onUpdate={fetchTodos}></TodoForm>
          <TodoList data={todos} onUpdate={fetchTodos} session={session}></TodoList>
        </main>
      }
    </>
  )
}
