// Connecting to the db
import sqlite3 from 'sqlite3'
sqlite3.verbose()

export const db = new sqlite3.Database(
  './src/models/users.db',
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) throw err
    console.log('✔ Database Connected')
  }
)
