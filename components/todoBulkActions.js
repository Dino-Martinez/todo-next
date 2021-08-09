import styles from '../styles/BulkActions.module.scss'
import { useState } from 'react'

export default function TodoBulkActions({ numLeft, callback, onUpdate }) {
  const [filter, setFilter] = useState('all')

  const deleteCompletedTodos = () => {
    fetch(`/api/todos/${session.user.email}`, {
      method: 'DELETE',
      body: JSON.stringify({
        all: true,
        todos
      })
    })
    onUpdate()
  }

  const setActive = (query) => {
    setFilter(query)
    callback(query)
  }

  return (
    <article className={styles.group}>
      <p>{numLeft} todo(s) left</p>
      <button data-active={filter === 'all'} className={styles.btn} onClick={() => { setActive('all') }}>All</button>
      <button data-active={filter === 'pending'} className={styles.btn} onClick={() => { setActive('pending') }}>Pending</button>
      <button data-active={filter === 'complete'} className={styles.btn} onClick={() => { setActive('complete') }}>Complete</button>
      <button className={styles.btn} onClick={() => { deleteCompletedTodos() }} >Delete completed</button>
    </article>
)
}