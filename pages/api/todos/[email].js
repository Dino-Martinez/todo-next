import { connectToDatabase } from '../../../lib/mongodb'

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
}