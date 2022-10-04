import { db } from '../database.js'
import bcrypt from 'bcrypt'

export default async function addUser(req, res) {
  try {
    const { username, password } = req.body
    const selectQuery = 'SELECT * FROM users WHERE username = ?'

    if (username.length <= 1) {
      res.json({ error: 'Username to short' })
    }
    // Checking if the user already exists
    else
      db.all(selectQuery, [username], async (err, rows) => {
        if (err) {
          console.log(err)
          res.status(500).json({ msg: 'Internal Server Error' })
        }
        // If no matches, insert it's data
        if (rows.length === 0 && username && password) {
          // Hashing the password
          const hashedPassword = await bcrypt.hash(password, 10)

          db.run(
            'INSERT INTO users(username, password) VALUES(?, ?)',
            [username, hashedPassword],
            (err) => {
              if (err) {
                console.log(err)
                res.status(500).json({ error: 'Internal Server Error' })
              }
            }
          )

          // Selecting the user and showing his info
          db.get(selectQuery, [username], (err, row) => {
            res.json({ id: row.id, user: row.username, password })
          })
        } else if (rows.length === 1)
          res.status(401).json({ error: 'User already exists' })
        else res.status(400).json({ error: 'Invalid Request' })
      })
  } catch (error) {
    res.status(400).send('Bad request')
  }
}
