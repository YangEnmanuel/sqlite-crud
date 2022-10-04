import { db } from '../database.js'
import bcrypt from 'bcrypt'

export default function loginUser(req, res) {
  try {
    const { username, password } = req.body

    // Just selecting by the username, later check if the password is ok
    // This helps giving feedback to the user if the password is incorrect
    db.get(
      'SELECT * FROM users WHERE username = ?',
      [username],
      async (err, row) => {
        if (err) throw err
        if (!row) res.status(404).json({ error: 'User not found' })
        // Comparing the hashed password from DB with the inputted one
        else {
          !(await bcrypt.compare(password, row.password))
            ? res.status(401).json({ error: 'Wrong Password' })
            : res.json({ msg: `Logged in, welcome ${username}` })
        }
      }
    )
  } catch (e) {
    res.status(400).send('Bad request')
  }
}
