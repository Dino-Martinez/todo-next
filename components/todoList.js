import Todo from './todo'
import TodoBulkActions from './todoBulkActions'
import { useState, useEffect } from 'react'

export default function TodoList({ data, session, onUpdate }) {
  const [todos, filterData] = useState([])
  const [filter, setFilter] = useState('all')
  const [numLeft, setNumLeft] = useState(0)

  useEffect(() => {
    if (data) {
      if (filter === 'all') {
        filterData(data)
      }
      if (filter === 'pending') {
        filterData(data.filter(todo => !todo.completed))
      }
      if (filter === 'complete') {
        filterData(data.filter(todo => todo.completed))
      }
    }
  }, [data, filter])

  useEffect(() => {
    setNumLeft(todos.reduce((accumulator, current) => {
      if (current.completed)
        return accumulator 
      
      return accumulator + 1
    }, 0))
  }, [todos])

  return (
    <>
      {todos &&
        <>
          <ul>
            {
              todos.map(todo => {
                return <Todo key={todo._id} onUpdate={onUpdate} session={session} data={todo}></Todo>
              })
            }
          </ul>
          <TodoBulkActions numLeft={numLeft} onUpdate={onUpdate} callback={setFilter}></TodoBulkActions>
        </>
      }
    </>
  )
}