export default function TodoBulkActions({ numLeft, callback }) {
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
      <p>{numLeft} todo(s) left</p>
      <button onClick={() => { callback('all') }}>All</button>
      <button onClick={() => { callback('pending') }}>Pending</button>
      <button onClick={() => { callback('complete') }}>Complete</button>
      <button onClick={() => { deleteCompletedTodos() }} >Delete completed</button>
    </>
)
}