import Todo from './todo'

export default function TodoList({ todos, session }) {
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
          <div>{todos.length} todo(s) left</div>
        </>
      }
    </>
  )
}