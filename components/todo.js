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
      body: JSON.stringify({
        all: false,
        data
      })
    })
  }

  return (
    <li>
      <style jsx>{`
        p {
          display: inline;
        }
      `}</style>
      <button onClick={() => { completeTodo() }}>Toggle</button>
      {data.completed &&
        <p>✅</p>
      }
      {data.title}
      <button onClick={() => { deleteTodo() }}>Delete</button>
    </li>
  )
}