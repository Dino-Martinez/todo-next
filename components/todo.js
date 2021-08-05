export default function Todo({ data, session }) {
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
  }

  const deleteTodo = () => {
    fetch(`/api/todos/${session.user.email}`, {
      method: 'DELETE',
      body: JSON.stringify(data)
    })
  }

  return (
    <li>
      <button onClick={() => { completeTodo() }}>Toggle</button>
      {data.title}
      <button onClick={() => { deleteTodo() }}>Delete</button>
    </li>
  )
}