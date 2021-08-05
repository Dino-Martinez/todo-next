export default function Todo({ data, session }) {
  const completeTodo = () => {
    console.log(data.title)
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