import { connectToDatabase } from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req, res) {
  const { email } = req.query
  const { db } = await connectToDatabase()
  if (req.method === 'GET') {
    // Find todos for this user
    const users = await db
      .collection('users')
      .aggregate([
        {
          $lookup: {
              from: 'todos',
              localField: 'todo_ids',
              foreignField: '_id',
              as: 'todos'
          }
        }
      ])
      .toArray()
    
    const user = users.find(user => user.email === email)
    return res.status(200).json(user.todos)
  }

  if (req.method === 'POST') {
    // Insert new todo for this user
    const todo = JSON.parse(req.body)
    todo.description = ''
    todo.completed = false 
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