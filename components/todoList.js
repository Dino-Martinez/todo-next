import Todo from './todo'

export default function TodoList({ todos, session }) {
  const deleteCompletedTodos = () => {
    fetch(`/api/todos/${session.user.email}`, {
      method: 'DELETE',
      body: JSON.stringify({
        all: true,
        todos
      })
    })
  }
  return (
    <>
      {todos &&
        <>
          <ul>
            {
              todos.map(todo => {
                return <Todo key={todo._id} session={session} data={todo}></Todo>
              })
            }
          </ul>
          <div>
            <p>{todos.length} todo(s) left</p>
            <button onClick={() => { deleteCompletedTodos() }} >Delete completed</button>
          </div>
        </>
      }
    </>
  )
}