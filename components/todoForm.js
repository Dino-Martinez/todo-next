import { useState } from "react"
import styles from '../styles/Form.module.scss'
import todoStyles from '../styles/Todo.module.scss'

export default function TodoForm({ session, onUpdate }) {
  const [title, setTitle] = useState('')
  const onSubmit = event => {
    event.preventDefault()
    fetch(`/api/todos/${session.user.email}`, {
      method: 'POST',
      body: JSON.stringify({title})
    })
    onUpdate()
    setTitle('')
  }

  const onChange = (event) => {
    setTitle(event.target.value)
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <button className={todoStyles.check} type="submit"></button>
      <input
        className={styles.input}
        id="title"
        name="title"
        type="text"
        placeholder="Enter Title"
        onChange={onChange}
        value={title}
      />
    </form>
  )
}