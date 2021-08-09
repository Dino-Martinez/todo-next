import { useState } from "react"

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
    <form onSubmit={onSubmit}> 
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="Enter Title"
        onChange={onChange}
        value={title}
      />

      <button type="submit">Submit</button>
    </form>
  )
}