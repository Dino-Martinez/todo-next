import { useFormik } from 'formik'

export default function TodoForm({ session }) {
  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: values => {
      fetch(`/api/todos/${session.user.email}`, {
        method: 'POST',
        body: JSON.stringify(values)
      })
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}> 
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />

      <button type="submit">Submit</button>
    </form>
  )
}