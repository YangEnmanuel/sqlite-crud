/* 

TODO: 
1- Updates gives error if the new username is just 1 character
*/

import { db } from '../database.js'
import bcrypt from 'bcrypt'

export default function updateUser(req, res, next) {
  try {
    const { id } = req.params
    const { newUsername, newPassword } = req.body

    if (newUsername.length <= 1) {
      res.json({ error: 'Name to short' })
    }

    // Searching the user
    else
      db.get('SELECT * FROM users WHERE id = ?', [id], async (err, row) => {
        if (err) res.status(500).json({ error: 'Internal server error' })
        if (!row) res.status(400).json({ error: 'Bad request' })
        else {
          // Updating his info

          // Hashing password
          const hashedPassword = await bcrypt.hash(newPassword, 10)

          db.run(
            'UPDATE users SET username = ?, password = ? WHERE id = ?',
            [newUsername, hashedPassword, id],
            (err) => {
              if (err) res.json({ error: 'Server error' })
            }
          )

          // Searching the updated user and send feedback
          db.get('SELECT * FROM users WHERE id = ?', [id], (err, newRow) => {
            if (err) throw err

            res.json({ msg: 'Row updated', oldRow: row, newRow })
          })
        }
      })
  } catch (e) {
    res.status(400).send('Bad Request')
  }
}
