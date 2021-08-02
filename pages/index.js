import Head from 'next/head'
import { connectToDatabase } from '../lib/mongodb'
import styles from '../styles/List.module.css'

export default function Home({ todos }) {
  return (
    <div>
      <Head>
        <title>Todo Planner</title>
        <link key="1" rel="icon" href="/favicon.ico" />
        <link key="2" rel="preconnect" href="https://fonts.googleapis.com" />
        <link key="3" rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link key="4" href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300;400;700&display=swap" rel="stylesheet"></link>
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
  const { db } = await connectToDatabase()
  const users = await db
    .collection('users')
    .aggregate([
      {
        $lookup: {
            from: 'todos',
            localField: 'todo_ids',
            foreignField: '_id',
            as: 'todos'
        }
      }
    ])
    .toArray()
  
  const user = users.find(user => user.username === 'dino')
  
  console.log(user)

  return {  
    props: {
      todos: JSON.parse(JSON.stringify(user.todos)),
    },
  }
}
