import { db } from '../database.js'

export default function deleteUser(req, res) {
  try {
    const { id } = req.params

    // This helps checking how many rows are before and after the query
    function selectAll() {
      return new Promise((resolve) => {
        db.all('SELECT * FROM users', (err, rows) => {
          if (err) res.json({ error: 'Server error' })
          else resolve(rows)
        })
      })
    }

    ;(async () => {
      // First check how many rows before the delete statement
      let initialRows = await selectAll()
      db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) res.json({ error: 'Server error' })
      })

      // Checking if there were any changes
      let finalRows = await selectAll()

      if (initialRows.length - finalRows.length === 1) {
        res.json({ msg: `User deleted` })
      } else res.status(400).json({ error: 'Bad Request, no such user' })
    })()
  } catch (e) {
    res.status(400).send('Bad request')
  }
}
