import styles from '../styles/Todo.module.scss'

export default function Todo({ data, session, onUpdate }) {
  const completeTodo = () => {
    fetch(`/api/todos/${session.user.email}`, {
      method: 'PUT',
      body: JSON.stringify({
        _id: data._id,
        update: {
          completed: !data.completed
        }
      })
    })
    onUpdate()
  }

  const deleteTodo = () => {
    fetch(`/api/todos/${session.user.email}`, {
      method: 'DELETE',
      body: JSON.stringify({
        all: false,
        todo: data
      })
    })
    onUpdate()
  }
  return (
    <li className={styles.todo}>
      <style jsx>{`
        p {
          display: inline;
        }
      `}</style>
      {data.completed && 
        <button className={styles.complete} onClick={() => { completeTodo() }}></button>
      }
      {!data.completed &&
        <button className={styles.check} onClick={() => { completeTodo() }}></button>
      }
      <p className={styles.title}>{data.title}</p>
      <button className={styles.cross} onClick={() => { deleteTodo() }}></button>
    </li>
  )
}