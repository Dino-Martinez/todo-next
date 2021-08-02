import { connectToDatabase } from '../../../lib/mongodb'

export default async function handler(req, res) {
  const { email } = req.query
  const { db } = await connectToDatabase()
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