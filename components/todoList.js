export default function TodoList({ todos }) {
  return (
    <>
      <ul>
        {todos &&
          todos.map(todo => {
            return <li key={todo._id}>{todo.title}</li>
          })
        }
      </ul>
      <div>{todos.length} todo(s) left</div>
    </>
  )
}