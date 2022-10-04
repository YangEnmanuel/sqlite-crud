// Server initialization
import express from 'express'
import { router } from './routes/routes.js'

const app = express()

app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 3000)
console.log(`✔ Server on http://localhost:3000`)
