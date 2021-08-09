import { connectToDatabase } from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { email } = req.query
  const { db } = await connectToDatabase()
  if (req.method === 'GET') {
    // Find todos for this user
    const todos = await db
      .collection('todos')
      .find({ author: email })
      .toArray()
    
    return res.status(200).json(todos)
  }

  if (req.method === 'POST') {
    // Insert new todo for this user
    const todo = JSON.parse(req.body)
    todo.description = ''
    todo.completed = false
    todo.author = email 
    await db.collection('todos')
      .insertOne(todo)

    await db
      .collection('users')
      .updateOne(
        { email: email },
        { $push: {
            todo_ids: todo._id
          } 
        },
        { upsert: false }
      )
    
    res.status(200).send('Added todo')
  }

  if (req.method === 'DELETE') {
    const data = JSON.parse(req.body)
    if (data.all) {
      const completed = data.todos.forEach(async todo => {
        if (todo.completed) {
          const result = await db.collection('todos')
            .deleteOne({ _id: new ObjectId(todo._id) })
        }
      })
      return res.status(200).send('Deleted all completed todos')
    }

    const todo = data.todo
    const result = await db.collection('todos')
      .deleteOne({ _id: new ObjectId(todo._id) })
    
    res.status(200).send('Deleted todo')
  }

  if (req.method === 'PUT') {
    const data = JSON.parse(req.body)
    const result = await db.collection('todos')
      .updateOne({ _id: new ObjectId(data._id) }, { $set: data.update })

    res.status(200).send('Toggled todo completion')
  }
}