// This are simple actions that don't need a separate file for each one

import { db } from '../database.js'

export const welcomeUser = (req, res) => {
  res.send('Hello')
}

export const getUsers = (req, res) => {
  db.all('SELECT * FROM users', (err, users) => {
    if (err) res.status(500).json({ error: 'Internal Server Error' })
    else res.json(users)
  })
}

export const getUserByID = (req, res) => {
  const { id } = req.params

  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) res.status(500).json({ error: 'Internal Server Error' })
    if (!row) res.status(400).json({ error: 'Invalid request' })
    else res.json({ user: row })
  })
}
