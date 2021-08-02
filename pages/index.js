import Head from 'next/head'
import { connectToDatabase } from '../lib/mongodb'
import styles from '../styles/List.module.css'

export default function Home({ todos }) {
  return (
    <div>
      <Head>
        <title>Todo Planner</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.list}>
        {todos &&
          todos.map(todo => {
            return <p key={todo._id}>{todo.title}</p>
          })
        }
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();
  const todos = await db
    .collection('todos')
    .find({})
    .toArray();
  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}
